import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import RoutePanel from './RoutePanel'; // 确保路径正确
import DownloadButton from './DownloadButton';
import AudioPlayer from './AudioPlayer';
import { Container, Grid, Box, Typography } from '@mui/material';

const Map = ({ originInput,searchTrigger }) => {
  const mapRef = useRef(null);
  const chartRef = useRef(null);
  const markerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const coloredPathRef = useRef([])
  const [apiLoaded, setApiLoaded] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const originMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);


  // 监听清除路径和地图


  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        setApiLoaded(true);
      } else if (!document.querySelector('script[src*="maps.googleapis"]')) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDjQXyYlP5QOFLFJ58xocind5smlnaC3mA&libraries=places,geometry`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        script.onload = () => setApiLoaded(true);
      }
    };
    loadGoogleMapsApi();
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement && node.matches('.gm-style-iw-d')) {
            const navigateButton = document.createElement('button');
            navigateButton.textContent = 'Navigate Here';
            navigateButton.style.cssText = 'display: block; width: 100%; padding: 5px; margin-top: 8px;';
            navigateButton.onclick = () => {
              if (originMarkerRef.current && destinationMarkerRef.current) {
                const origin = {
                  lat: originMarkerRef.current.getPosition().lat(),
                  lng: originMarkerRef.current.getPosition().lng()
                };
                const destination = {
                  lat: destinationMarkerRef.current.getPosition().lat(),
                  lng: destinationMarkerRef.current.getPosition().lng()
                };
                searchRoute(origin, destination);  // Call the search route function with these coordinates
              } else {
                console.error("Origin or destination marker is not set.");
              }
            };
            node.appendChild(navigateButton);
          }
        });
      });
    });
  
    // 配置observer监控子节点的添加
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  
    // 清理函数
    return () => observer.disconnect();
  }, []);
  
  

  useEffect(() => {
    if (apiLoaded && !map && mapRef.current) {
      const melbourneCBD = { lat: -37.8136, lng: 144.9631 };
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: melbourneCBD,
        zoom: 14,
      });


      newMap.setOptions({ styles: mapStyles });
      const transitLayer = new window.google.maps.TransitLayer();
      transitLayer.setMap(newMap);
      const kmzLayer = new google.maps.KmlLayer({
        url: 'https://storage.googleapis.com/g13/melbourne_wheeelchair.kmz',
        map: newMap,
        preserveViewport: true  // 防止地图自动缩放到 KMZ 层的边界
      });
      // 为KMZ图层的marker添加点击事件
      kmzLayer.addListener('click', function(kmlEvent) {
        const destPosition = { lat: kmlEvent.latLng.lat(), lng: kmlEvent.latLng.lng() };
        if (destinationMarkerRef.current) {
          destinationMarkerRef.current.setMap(null);
        }
        const newDestinationMarker = new window.google.maps.Marker({
          position: destPosition,
          map: newMap,
          title: 'Destination',
          icon: { // Optional: Custom icon
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new google.maps.Size(40, 40) // Adjust the size as needed
          }
        });
        destinationMarkerRef.current = newDestinationMarker;

      });
      setMap(newMap);
    }
  }, [apiLoaded, mapRef.current]);



  // Handle external origin input (e.g., from a text input)
  useEffect(() => {
    const updateOriginFromInput = async () => {
      if (originInput && typeof originInput === 'string') {
        const coords = await getLatLng(originInput);
        updateMarker(coords, 'origin');
      }
    };
    updateOriginFromInput();
  }, [originInput])

  // Update map marker for origin or destination
    // Update map marker for origin
    const updateMarker = (coords) => {
      console.log("Updating marker..."); 
      if (originMarkerRef.current) {
        originMarkerRef.current.setMap(null); // Remove existing marker
        console.log("Removing existing marker from map."); 
      }
      const newMarker = new window.google.maps.Marker({
        position: coords,
        map: map,
        title: 'Start',
        icon: { // Optional: Custom icon
          url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          scaledSize: new google.maps.Size(40, 40) // Adjust the size as needed
        }
      });
      originMarkerRef.current = newMarker;
        // Focus the map on the new marker
      if (map) {
        map.panTo(newMarker.getPosition()); // Smoothly pan the map to the new marker location
      } else {
        console.error("Map not initialized when trying to pan.");
      }
    };

  // Handle map clicks to set origin
  useEffect(() => {
    if (map) {
      const clickListener = map.addListener('click', (e) => {
        const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        console.log("Map clicked at:", coords); // Debug: Confirm click coordinates
        updateMarker(coords);
      });
      return () => {google.maps.event.removeListener(clickListener);
        console.log("Listener removed"); // Debug: Confirm listener removal on unmoun
      }
    }
  }, [map]);

  const getLatLng = async (name) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: name,
        key: 'AIzaSyDjQXyYlP5QOFLFJ58xocind5smlnaC3mA'
      }
    });
    return response.data.results[0].geometry.location;
  };

  const searchRoute = async (origin, destination) => {
    if (!origin || !destination) return;
      try{
        const response = await axios({
        method: 'post',
        url: 'https://api.openrouteservice.org/v2/directions/wheelchair/geojson',
        headers: {
          'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
          'Content-Type': 'application/json',
          'Authorization': '5b3ce3597851110001cf62486ab7a2ec0ad349c69dc9111dc0cb6e29'
        },
        data: {
          coordinates: [[origin.lng, origin.lat], [destination.lng, destination.lat]],
          elevation: true,
          extra_info: ["steepness", "surface"],
          instructions: true,
          instructions_format: "text"
        }
      });
      setRouteData(response.data)

    } catch (error) {
      console.error('Failed to search route:', error);
      alert('Failed to fetch directions');
    }
  };
  // search route
  useEffect(() => {
    if (origin && destination) {
      searchRoute();
    }
  }, [origin, destination]);

  // plan route
  useEffect(() => {
    if (routeData) {
      displayRoute(routeData);
      createElevationProfile(routeData);
    }
  }, [routeData]); // 依赖于routeData的变化




  const displayRoute = (routeData) => {
    const coordinates = routeData.features[0].geometry.coordinates;
    const path = coordinates.map(coord => ({ lat: coord[1], lng: coord[0] }));
    let coloredPath = [];
    let bounds = new google.maps.LatLngBounds();

    if (coordinates.length === 0) {
      console.error('No coordinates available to display the route.');
      return;
    }


    const originLatLng = new google.maps.LatLng(coordinates[0][1], coordinates[0][0]);
    const destinationLatLng = new google.maps.LatLng(coordinates[coordinates.length - 1][1], coordinates[coordinates.length - 1][0]);



    // Function to calculate the gradient
    const calculateGradient = (coord1, coord2) => {
      if (!coord1 || !coord2 || coord1.length < 3 || coord2.length < 3) {
        console.error('Invalid coordinates:', coord1, coord2);
        return 0; // default to zero gradient if data is invalid
      }
      const rise = coord2[2] - coord1[2]; // elevation difference
      const run = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(coord1[1], coord1[0]),
        new google.maps.LatLng(coord2[1], coord2[0])
      );
      return Math.abs(rise) / run;
    };

    // Determine the color based on the gradient
    const getColor = (gradient) => {
      if (gradient > 1 / 20) return '#FF0000'; // Steeper than 1:20
      if (gradient > 1 / 40) return '#FFA500'; // Steeper than 1:40 but less than 1:20
      return '#008000'; // Less steep
    };
    // Clear the previous path before drawing new
    coloredPathRef.current.forEach(segment => segment.setMap(null));
    coloredPathRef.current = [];

    // Create segments with colors
    for (let i = 0; i < coordinates.length - 1; i++) {
      const startLatlng = new google.maps.LatLng(coordinates[i][1], coordinates[i][0]);
      const endLatlng = new google.maps.LatLng(coordinates[i + 1][1], coordinates[i + 1][0]);
      const gradient = calculateGradient(coordinates[i], coordinates[i + 1]);
      const color = getColor(gradient);
      const segment = new google.maps.Polyline({
        path: [startLatlng, endLatlng],
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      segment.setMap(map);
      coloredPathRef.current.push(segment);
      bounds.extend(startLatlng);
      bounds.extend(endLatlng);
    }

    // Add the colored segments to the map


    // Extend bounds to include the origin and destination
    bounds.extend(originLatLng);
    bounds.extend(destinationLatLng);

    map.fitBounds(bounds);
  };

  const updateMapMarker = (index) => {
    if (!routeData || !routeData.features || routeData.features.length === 0) {
      console.error('Route data is not available');
      return; // 提前返回以避免访问未定义的数据
    }

    const coord = routeData.features[0].geometry.coordinates[index];
    const latLng = new google.maps.LatLng(coord[1], coord[0]);
    if (!markerRef.current) {
      markerRef.current = new google.maps.Marker({
        position: latLng,
        map: map,
        title: `Elevation: ${coord[2]}m`
      });
    } else {
      markerRef.current.setPosition(latLng);
      markerRef.current.setTitle(`Elevation: ${coord[2]}m`);
    }
  };

  const createElevationProfile = (routeData) => {
    const coordinates = routeData.features[0].geometry.coordinates;
    const surfaceSegments = routeData.features[0].properties.extras.surface.values;

    // Dictionary for surface types
    const surfaceTypeDictionary = {
      0: 'Unknown',
      1: 'Paved',
      2: 'Unpaved',
      3: 'Asphalt',
      4: 'Concrete',
      5: 'Cobblestone',
      6: 'Metal',
      7: 'Wood',
      8: 'Compacted Gravel',
      9: 'Fine Gravel',
      10: 'Gravel',
      11: 'Dirt',
      12: 'Ground',
      13: 'Ice',
      14: 'Paving Stones',
      15: 'Sand',
      16: 'Woodchips',
      17: 'Grass',
      18: 'Grass Paver'
    };

    // Preparing elevation data with corresponding surface types for each point
    const elevationData = coordinates.map((coord, index) => ({
      x: index, // x-coordinate for clarity
      y: coord[2], // elevation
      surfaceType: 'Unknown' // Default surface type
    }));

    // Apply the surface type to the elevation data points using the dictionary
    for (const segment of surfaceSegments) {
      const [startIndex, endIndex, surfaceType] = segment;
      const surfaceName = surfaceTypeDictionary[surfaceType] || 'Unknown';
      for (let i = startIndex; i <= endIndex; i++) {
        elevationData[i].surfaceType = surfaceName; // Use name from dictionary
      }
    }

    const ctx = chartRef.current.getContext('2d');

    // Destroy the existing chart if it exists
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    chartRef.current.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: elevationData.map((_, i) => `${i}m`),
        datasets: [{
          label: 'Elevation',
          data: elevationData,
          borderColor: 'rgb(75, 192, 192)',
          fill: true,
        }]
      },
      options: {
        interaction: {
          mode: 'nearest', // 最接近的点
          axis: 'x', // 根据x轴进行交互
          intersect: false // 不需要完全交叉
        },
        maintainAspectRatio: false,
        responsive: false,
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Elevation (m)'
            }
          }
        },
        plugins: {
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            custom: function (tooltipModel) {
              if (tooltipModel.dataPoints) {
                console.log('this is index', index)
                const index = tooltipModel.dataPoints[0].index;
                updateMapMarker(index);
              }
            },
            callbacks: {
              label: function (context) {
                const label = context.dataset.label || '';
                const elevation = context.parsed.y;
                const surfaceType = context.raw.surfaceType;
                return `${label}: ${elevation}m, Surface: ${surfaceType}`;
              }
            }
          }
        },
        onHover: (event, chartElement) => {
          if (chartElement.length > 0) {
            const index = chartElement[0].index;
            updateMapMarker(index);
          }
        }
      }
    });
  };



  return (
    <>
    <Container maxWidth="xl">
      <Grid container>
        <Grid item xs={12} md={routeData ? 9 : 12}>
          <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }}>
              {/* 地图容器 */}
            </div>
            <canvas ref={chartRef} style={{
              position: 'absolute',
              bottom: '20px',
              right: '60px',
              backgroundColor: '#fff',
              boxShadow: '0 0 8px rgba(0,0,0,0.5)',
              opacity: 0.85,
              width: '280px',
              height: '220px'
            }}>
              {/* 图表容器 */}
            </canvas>
            <Box position="absolute" left={10} bottom={10} zIndex="tooltip">
                <DownloadButton routeData={routeData} />
              </Box>
          </div>
        </Grid>
        {routeData && (
          <Grid item xs={12} md={3}>
            <RoutePanel routeData={routeData} />
          </Grid>
        )}
      </Grid>
    </Container>
    <div>
    <Typography>More over! Click here to get the AI Generated Voice Guide!</Typography>
    <AudioPlayer routeData={routeData} />
    </div>
    </>
  );
};

const mapStyles = [
  {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "color": "#ffffff" }
    ]
  }
];

export default Map;

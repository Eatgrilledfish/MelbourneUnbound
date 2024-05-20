import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import RoutePanel from './RoutePanel'; // 确保路径正确
import DownloadButton from './DownloadButton';
import AudioPlayer from './AudioPlayer';
import { Container, Grid, Box,Button,Typography } from '@mui/material';

const Map = ({ origin, destination, searchTrigger }) => {
  const mapRef = useRef(null);
  const chartRef = useRef(null);
  const markerRef = useRef(null);
  const [map, setMap] = useState(null);
  const coloredPathRef = useRef([])
  const [apiLoaded, setApiLoaded] = useState(false);
  const [routeData, setRouteData] = useState(null);
  const [originMarker, setOriginMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [optimizedData, setOptimizedData] = useState(null);
  const [apiResponse, setApiResponse] = React.useState('');

  // 与后端交互
  const handleSendRouteData = () => {
    const { features } = routeData;
    const optimizedData = features.map(feature => {
      const { properties, geometry } = feature;
      const { segments, extras } = properties;
  
      // 提取关键的段落信息
      const relevantSegments = segments.map(segment => ({
        distance: segment.distance,
        duration: segment.duration,
        steps: segment.steps.map(step => ({
          distance: step.distance,
          duration: step.duration,
          instruction: step.instruction,
          type: step.type
        })),
        ascent: segment.ascent,
        descent: segment.descent
      }));
  
      // 提取表面和坡度信息
      const relevantExtras = {
        surface: extras.surface.values.map(s => ({
          from: s[0],
          to: s[1],
          type: s[2]
        })),
        steepness: extras.steepness.values.map(s => ({
          from: s[0],
          to: s[1],
          level: s[2]
        }))
      };
  
      return {
        geometry,
        segments: relevantSegments,
        extras: relevantExtras
      };
    });
    setOptimizedData(optimizedData);
  };

  // 监听清除路径和地图
  useEffect(() => {
    if (map && origin && destination && searchTrigger) {

      searchRoute();
    }
  }, [map, origin, destination, searchTrigger]);

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
    if (apiLoaded && !map && mapRef.current) {
      const melbourneCBD = { lat: -37.8136, lng: 144.9631 };
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: melbourneCBD,
        zoom: 14,
        styles: [
          {
            featureType: "poi.business", // 目标商业地点，包括酒店
            stylers: [{ visibility: "off" }] // 隐藏这些地点
          }
        ]
      });
      setMap(newMap);
    }
  }, [apiLoaded, mapRef.current]);

  useEffect(() => {
    if (map && origin && destination && searchTrigger) {
      searchRoute();
    }
  }, [map, searchTrigger, origin, destination]);



  const getLatLng = async (name) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: name,
        key: 'AIzaSyDjQXyYlP5QOFLFJ58xocind5smlnaC3mA'
      }
    });
    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };
  };

  const searchRoute = async () => {
    try {
      const originCoords = await getLatLng(origin);
      const destinationCoords = await getLatLng(destination);
      if (!map) {
        console.error('Map instance is not ready');
        return;
      }
      const response = await axios({
        method: 'post',
        url: 'https://api.openrouteservice.org/v2/directions/wheelchair/geojson',
        headers: {
          'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
          'Content-Type': 'application/json',
          'Authorization': '5b3ce3597851110001cf62486ab7a2ec0ad349c69dc9111dc0cb6e29'
        },
        data: {
          coordinates: [[originCoords.lng, originCoords.lat], [destinationCoords.lng, destinationCoords.lat]],
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

  useEffect(() => {
    if (routeData) {
      console.log('this is routedata',routeData)
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
      // 清除旧的起点和终点标记
    if (originMarker) {
      originMarker.setMap(null);
      setOriginMarker(null);
    }
    if (destinationMarker) {
      destinationMarker.setMap(null);
      setDestinationMarker(null);
    }

    const originLatLng = new google.maps.LatLng(coordinates[0][1], coordinates[0][0]);
    const destinationLatLng = new google.maps.LatLng(coordinates[coordinates.length - 1][1], coordinates[coordinates.length - 1][0]);

    // Create markers for the origin and destination
    const newOriginMarker = new google.maps.Marker({
      position: originLatLng,
      map: map,
      title: 'Origin',
      icon: { // Optional: Custom icon
        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        scaledSize: new google.maps.Size(40, 40) // Adjust the size as needed
      }
    });

    const newDestinationMarker = new google.maps.Marker({
      position: destinationLatLng,
      map: map,
      title: 'Destination',
      icon: { // Optional: Custom icon
        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new google.maps.Size(40, 40) // Adjust the size as needed
      }
    });

      // 更新状态以追踪新的标记
    setOriginMarker(newOriginMarker);
    setDestinationMarker(newDestinationMarker);

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
          </div>
        </Grid>
        {routeData && (
          <Grid item xs={12} md={3}>
            <RoutePanel routeData={routeData} />
          </Grid>
        )}
      </Grid>
    </Container>
    <div style={{ textAlign: 'center' }}>
    <Typography>More over! Click here to get the AI Generated Voice Guide!</Typography>
    <AudioPlayer routeData={routeData} />
  </div>
  <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'center' }}>
  <Grid container spacing={2} alignItems="center" sx={{ maxWidth: '80%', textAlign: 'center' }}>
    <Grid item xs={12} md={6}>
      <Typography variant="h1" sx={{ 
        fontSize: { xs: '30px', md: '60px' }, 
        fontWeight: '700', 
        marginRight: { xs: '0', md: '50px' }, 
        textAlign: { xs: 'center', md: 'right' }, 
        opacity: 1, 
        background: 'linear-gradient(to bottom, black, #CCCCCC)', 
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent', 
        backgroundClip: 'text', 
        color: 'transparent' 
      }}>
        Take your route with you
      </Typography>
    </Grid>
    <Grid item xs={12} md={6} container direction="column" alignItems={{ xs: 'center', md: 'flex-start' }}>
      <Typography variant="body1" sx={{ 
        fontSize: { xs: '14px', md: '16px' }, 
        textAlign: { xs: 'center', md: 'left' }, 
        marginBottom: '10px' 
      }}>
        Never fear losing your way. Download the accessible stop information and skim through at your convenience.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
        <DownloadButton routeData={routeData} />
      </Box>
    </Grid>
  </Grid>
</Box>
    </>
  );
};

export default Map;

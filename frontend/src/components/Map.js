import React, { useRef, useEffect, useState } from 'react';
import * as turf from '@turf/turf';

const Map = ({ geoJsonUrl, origin, destination,searchTrigger }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [polygons, setPolygons] = useState([]);  // 存储所有GeoJSON多边形
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);  // 控制API加载的状态

  // 动态加载Google Maps API
  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        setApiLoaded(true);  // 设置API加载完成状态
        return;
      }
      if (!document.querySelector('script[src*="maps.googleapis"]')) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA4bcHQArQWH2Qxb47goCAhbstZX0WkUZk&libraries=places,geometry`;
        script.async = true;
        script.defer = true;
        script.onload = () => setApiLoaded(true);
        document.head.appendChild(script);
      }
    };

    loadGoogleMapsApi();
  }, []);

  // 初始化地图
  useEffect(() => {
    if (apiLoaded && !map && mapRef.current) {
      initializeMap();
    }
  }, [apiLoaded, mapRef.current]); // 依赖API加载状态和mapRef的变化

  useEffect(() => {
    if (map && origin && destination) {
      searchRoute(); // 调用搜索路线的函数
    }
  }, [map, origin, destination, searchTrigger]); // 依赖于 searchTrigger

  useEffect(() => {
    if (geoJsonUrl) {
      fetch(geoJsonUrl)
        .then(response => response.json())
        .then(data => {
          setGeoJsonData(data);  // Save fetched GeoJSON data to state
        });
    }
  }, [geoJsonUrl]);
  


  const initializeMap = () => {
    const melbourneCBD = { lat: -37.8136, lng: 144.9631 };
    const newMap = new window.google.maps.Map(mapRef.current, {
      center: melbourneCBD,
      zoom: 14,
    });

    // loading GeoJSON create multi shape
    if (geoJsonUrl) {
      fetch(geoJsonUrl)
        .then(response => response.json())
        .then(data => {
          const loadedPolygons = data.features.map(feature => {
            if (feature.geometry && feature.geometry.type === 'MultiPolygon') {
              return feature.geometry.coordinates.map(polygonCoords => {
                const paths = polygonCoords.map(ring => ring.map(coords => ({ lat: coords[1], lng: coords[0] })));
                return new google.maps.Polygon({
                  paths: paths,
                  map: newMap,
                  strokeColor: 'black',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: 'white',
                  fillOpacity: 0.35
                });
              });
            }
            return null;
          }).filter(poly => poly !== null).flat();
          setPolygons(loadedPolygons);
        });
    }

    newMap.setOptions({ styles: mapStyles });
    setMap(newMap);
  };

  // search route
  const searchRoute = () => {
    const directionsService = new google.maps.DirectionsService();
    const geocoder = new google.maps.Geocoder();
    let directionsRenderer = new google.maps.DirectionsRenderer({
      map: map,
  });
    
  
    // Helper function to geocode an address
    const geocodeAddress = (address, callback) => {
      geocoder.geocode({ 'address': address }, (results, status) => {
        if (status === 'OK') {
          callback(results[0].geometry.location);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    };
  
    // Convert origin and destination from address to LatLng
    geocodeAddress(origin, (originLatLng) => {
      if (!geoJsonData) {
        console.error('GeoJSON data is not loaded');
        return;
      }
      geocodeAddress(destination, (destinationLatLng) => {
        // Once both addresses are geocoded
        const originPoint = turf.point([originLatLng.lng(), originLatLng.lat()]);
        const destinationPoint = turf.point([destinationLatLng.lng(), destinationLatLng.lat()]);
  
        const isCloseEnough = (point) => {
          return geoJsonData.features.some(feature => {
            const featurePoint = turf.point([feature.properties.geo_point_2d.lon, feature.properties.geo_point_2d.lat]);
            const distance = turf.distance(point, featurePoint, { units: 'meters' });
            return distance < 50;
          });
        };
  
        const originCloseEnough = isCloseEnough(originPoint);
        const destinationCloseEnough = isCloseEnough(destinationPoint);
        console.log('originPoint:',originPoint)
        console.log('destinationPoint:',destinationPoint)
  
        if (!originCloseEnough || !destinationCloseEnough) {
          alert("起点或终点超出了限定区域");
          return;
        }
  
        if (originLatLng && destinationLatLng) {
          // Request and display the route
          directionsService.route({
            origin: originLatLng,
            destination: destinationLatLng,
            travelMode: google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(result);
            } else {
              console.error('Failed to display directions due to: ' + status);
            }
          });
        }
      });
    });
  };
  
  



  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
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

import React, { useRef, useEffect, useState } from 'react';

const Map = ({ origin, destination, searchTrigger, travelMode }) => {

  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [apiLoaded, setApiLoaded] = useState(false);  // 控制API加载的状态
  const directionsRenderer = useRef(null);

  // 动态加载Google Maps API
  useEffect(() => {
    const loadGoogleMapsApi = () => {
      if (window.google && window.google.maps) {
        setApiLoaded(true);  // 设置API加载完成状态
        return;
      }
      if (!document.querySelector('script[src*="maps.googleapis"]')) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDjQXyYlP5QOFLFJ58xocind5smlnaC3mA&libraries=places,geometry`;
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
  }, [apiLoaded, mapRef.current]);

  useEffect(() => {
    if (map && origin && destination && searchTrigger) {
      clearRouteAndPanel();  // 首先清除当前路线
      console.log('Searching new route');
      searchRoute();  // 然后搜索新路线
    }
  }, [map, searchTrigger]);

  const clearRouteAndPanel = () => {
    console.log('Executing clearRouteAndPanel');
    if (directionsRenderer.current) {
      console.log('DirectionsRenderer is set, clearing map and panel');
      directionsRenderer.current.setMap(null);
      directionsRenderer.current.setPanel(null);
      console.log('Map and panel cleared');
    } else {
      console.log('DirectionsRenderer not set');
    }
  };

  const initializeMap = () => {
    const melbourneCBD = { lat: -37.8136, lng: 144.9631 };
    const newMap = new window.google.maps.Map(mapRef.current, {
      center: melbourneCBD,
      zoom: 14,
    });

    newMap.setOptions({ styles: mapStyles });
    const transitLayer = new window.google.maps.TransitLayer();
    transitLayer.setMap(newMap);
    const kmlLayer = new google.maps.KmlLayer({
      url: `${window.location.origin}/accesible-tram-stop.kml`,  // 使用根相对路径
      map: newMap
    });
    setMap(newMap);
    directionsRenderer.current = new window.google.maps.DirectionsRenderer();
    directionsRenderer.current.setMap(newMap);
    directionsRenderer.current.setPanel(document.getElementById('directionsPanel'));
  };

  // 搜索路线
  const searchRoute = () => {
    const directionsService = new google.maps.DirectionsService();
    const geocoder = new google.maps.Geocoder();

    directionsRenderer.current.setMap(map);
    directionsRenderer.current.setPanel(document.getElementById('directionsPanel'));

    const geocodeAddress = (address, callback) => {
      geocoder.geocode({ 'address': address }, (results, status) => {
        if (status === 'OK') {
          callback(results[0].geometry.location);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    };

    geocodeAddress(origin, (originLatLng) => {
      geocodeAddress(destination, (destinationLatLng) => {
        if (originLatLng && destinationLatLng) {
          directionsService.route({
            origin: originLatLng,
            destination: destinationLatLng,
            travelMode: travelMode,
            transitOptions: {
              modes: ['BUS', 'RAIL'],
              routingPreference: 'FEWER_TRANSFERS'
            },
          }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsRenderer.current.setDirections(result);
            } else {
              console.error('Failed to display directions due to: ' + status);
            }
          });
        }
      });
    });
  };

  return (
    <div>
      <div ref={mapRef} style={{ width: '70%', height: '500px', float: 'left' }}></div>
      <div id="directionsPanel" style={{ width: '30%', height: '500px', float: 'right', overflow: 'auto' }}></div>
    </div>
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

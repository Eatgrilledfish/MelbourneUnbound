"use client";
import React, { useState, useEffect } from 'react';
import Map from './Map';
import SearchBar from '../../components/main/homesearch'; // 调整路径以符合您的文件结构
import Footer from '../../components/main/Footer';
import { Box } from '@mui/material';

const Home = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [travelMode, setTravelMode] = useState(null); // Initialize to null
  const [apiLoaded, setApiLoaded] = useState(false); // Track API load status

  // Dynamically load the Google Maps API
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA4bcHQArQWH2Qxb47goCAhbstZX0WkUZk&libraries=places";
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => {
        setApiLoaded(true);
        setTravelMode(google.maps.TravelMode.WALKING); // Set travel mode after API is loaded
      };
    } else {
      setApiLoaded(true);
      setTravelMode(google.maps.TravelMode.WALKING);
    }
  }, []);

  const handleSearchClick = () => {
    setSearchTrigger(prev => prev + 1);
  };

  if (!apiLoaded) {
    return <div>Loading...</div>; // Optionally render a loading state
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <Box mb={20}><SearchBar /></Box>
      <div>
        <h1>Explore Melbourne CBD</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <input
            type="text"
            value={origin}
            onChange={e => setOrigin(e.target.value)}
            placeholder="Enter origin"
          />
          <input
            type="text"
            value={destination}
            onChange={e => setDestination(e.target.value)}
            placeholder="Enter destination"
          />
          <select value={travelMode} onChange={e => setTravelMode(google.maps.TravelMode[e.target.value])}>
            <option value="WALKING">Walking</option>
            <option value="TRANSIT">Public Transit</option>
          </select>
          <button onClick={handleSearchClick}>Enter</button>
        </div>
      </div>
      <div style={{ width: '100%', flexGrow: 1 }}>
        <Map
          style={{ width: '100%', height: '100%' }}
          geoJsonUrl="footpath-steepness.geojson"
          origin={origin}
          destination={destination}
          travelMode={travelMode}
          searchTrigger={searchTrigger}
        />
      </div>
      <Box mt={20}><Footer/></Box>
      
    </div>
    
  );
  
};

export default Home;

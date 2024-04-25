"use client";
// app/index.js
// app/index.js
// app/index.js
import React, { useState, useRef } from 'react';
import Map from './Map';

const Home = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(0); // Use a counter instead of boolean for more reliable triggering

  const handleSearchClick = () => {
    setSearchTrigger(prev => prev + 1); // Increment to trigger search
  };

  return (
    <div>
      <h1>Explore Melbourne CBD</h1>
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
      <button onClick={handleSearchClick}>Enter</button>
      <Map
        geoJsonUrl="footpath-steepness.geojson"
        origin={origin}
        destination={destination}
        searchTrigger={searchTrigger}  // Passing searchTrigger as a prop
      />
    </div>
  );
};



export default Home;


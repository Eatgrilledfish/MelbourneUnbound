"use client";
// components/Map.js
import React from 'react';
import { GoogleMap, LoadScript, Marker, Data } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: -37.8136,  // Change this to your desired initial center
  lng: 144.9631  // Change this to your desired initial center
};

const Map = ({ geoJsonData, searchResults }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {geoJsonData && (
          <Data
            onLoad={dataLayer => dataLayer.addGeoJson(geoJsonData)}
            options={{
              fillColor: 'blue',
              strokeColor: 'blue',
              strokeWeight: 1,
            }}
          />
        )}

        {searchResults && searchResults.map((result, index) => (
          <Marker
            key={index}
            position={{ lat: result.location.lat, lng: result.location.lng }}
            title={result.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

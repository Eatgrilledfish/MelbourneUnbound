import React, { useEffect, useRef, useState } from 'react';

const loadGoogleMapsApi = (callback) => {
  if (window.google && window.google.maps && window.google.maps.places) {
    callback();
    return;
  }
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA4bcHQArQWH2Qxb47goCAhbstZX0WkUZk&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = callback;
  document.head.appendChild(script);
};

const SearchBar = ({ map }) => {
  const inputRef = useRef(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  useEffect(() => {
    loadGoogleMapsApi(() => {
      setIsApiLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isApiLoaded || !map || !inputRef.current) {
      console.error("Google Maps Places library is not loaded or map is not available.");
      return;
    }

    const newSearchBox = new window.google.maps.places.SearchBox(inputRef.current, {
      bounds: map.getBounds(),
    });

    newSearchBox.addListener('places_changed', () => {
      const places = newSearchBox.getPlaces();
      if (places.length === 0) {
        alert('No places found.');
        return;
      }

      const bounds = new window.google.maps.LatLngBounds();
      places.forEach(place => {
        if (!place.geometry) return;
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

    return () => newSearchBox.unbindAll(); // Cleanup listeners on unmount
  }, [isApiLoaded, map]);

  return <input ref={inputRef} type="text" placeholder="Enter a location" style={{ width: '100%', height: '40px' }} />;
};

export default SearchBar;

import React, { createContext, useState, useEffect, useContext } from 'react';

const GoogleMapsContext = createContext(null);

export const useGoogleMaps = () => useContext(GoogleMapsContext);

export const GoogleMapsProvider = ({ children }) => {
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setApiLoaded(true); // API is already loaded
    } else if (!document.querySelector('script[src*="maps.googleapis"]')) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=api&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = () => {
        setApiLoaded(true); // API is loaded
      };
    }
  }, []);

  return (
    <GoogleMapsContext.Provider value={{ apiLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

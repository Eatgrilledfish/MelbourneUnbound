import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

// 此处使用您的 Mapbox token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapboxGLMap = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // 这里假设 mapbox-gl-directions 已经被包含在 _app.js 或另一个脚本标签里了
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/czgs1234/clv84np3l001301rdb97ta1h6',
      center: [144.953777, -37.810019],
      zoom: 14
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken
    });

    map.addControl(directions, 'top-left');

    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default MapboxGLMap;

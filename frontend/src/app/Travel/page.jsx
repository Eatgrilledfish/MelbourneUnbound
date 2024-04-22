'use client'
import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// 动态导入 Mapbox 和插件
const MapboxGLMap = dynamic(() => import('./MapboxMap'), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

export default function MapPage() {
  return (
    <>
      <Head>
        <title>Display navigation directions</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css" rel="stylesheet" />
        <link href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.3.1/mapbox-gl-directions.css" rel="stylesheet" />
      </Head>
      <MapboxGLMap />
    </>
  );
}


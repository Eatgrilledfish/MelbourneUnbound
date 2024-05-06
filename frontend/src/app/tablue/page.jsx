// app/tableau/TableauEmbed/page.js
"use client";

import React, { useEffect, useRef } from 'react';

const TableauEmbed = ({ url }) => {
  const ref = useRef(null);

  useEffect(() => {
    let viz;
    const initViz = () => {
      if (viz) {
        viz.dispose();
      }
      viz = new window.tableau.Viz(ref.current, url);
    };

    if (window.tableau) {
      initViz();
    } else {
      const scriptElement = document.createElement("script");
      scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
      scriptElement.onload = () => initViz();
      document.body.appendChild(scriptElement);
    }

    return () => {
      if (viz) {
        viz.dispose();
      }
    };
  }, [url]);

  return <div ref={ref} style={{ width: '100%', height: '500px' }} />;
};

export default TableauEmbed;

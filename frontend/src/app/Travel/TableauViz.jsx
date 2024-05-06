import React, { useEffect } from 'react';

const TableauEmbed = ({ style }) => {
  useEffect(() => {
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    scriptElement.onload = () => {
      const vizElement = document.getElementById('viz1714839766042').getElementsByTagName('object')[0];
      if (vizElement) {
        vizElement.style.width = '100%';
        vizElement.style.height = '100%';
      }
    };

    const vizContainer = document.getElementById('viz1714839766042');
    vizContainer.appendChild(scriptElement);

    return () => {
      vizContainer.removeChild(scriptElement);
    };
  }, []);

  return (
    <div className="tableauPlaceholder" id="viz1714839766042" style={{ width: '800px', height: '600px', ...style }}>
      <noscript>
        <a href="#">
          <img alt="Nearest Washrooms" src="https://public.tableau.com/static/images/Ac/AccessibleWashroomsAnalysis/NearestWashrooms/1_rss.png" style={{ border: 'none' }} />
        </a>
      </noscript>
      <object className="tableauViz" style={{ display: 'none' }}>
        <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
        <param name="embed_code_version" value="3" />
        <param name="site_root" value="" />
        <param name="name" value="AccessibleWashroomsAnalysis/NearestWashrooms" />
        <param name="tabs" value="no" />
        <param name="toolbar" value="yes" />
        <param name="static_image" value="https://public.tableau.com/static/images/Ac/AccessibleWashroomsAnalysis/NearestWashrooms/1.png" />
        <param name="animate_transition" value="yes" />
        <param name="display_static_image" value="yes" />
        <param name="display_spinner" value="yes" />
        <param name="display_overlay" value="yes" />
        <param name="display_count" value="yes" />
        <param name="language" value="en-US" />
      </object>
    </div>
  );
};

export default TableauEmbed;

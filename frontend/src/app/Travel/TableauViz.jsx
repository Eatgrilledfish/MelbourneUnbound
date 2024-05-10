import { useEffect, useRef } from 'react';

const TableauViz = () => {
    const vizRef = useRef(null);

    useEffect(() => {
        const scriptId = 'tableau-viz-api';

        // Avoid re-adding the script if it's already appended
        if (document.getElementById(scriptId)) {
            initializeViz();
            return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
        script.onload = initializeViz;
        document.body.appendChild(script);

        return () => {
            // This cleanup function will be called both on unmount, and before re-running the effect if the component re-renders.
            const existingScript = document.getElementById(scriptId);
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []); // Empty dependency array ensures this effect only runs once

    const initializeViz = () => {
        if (!vizRef.current) {
            console.error('Visualization container is not ready');
            return;
        }

        const vizUrl = "https://public.tableau.com/views/AccessibleWashroomsAnalysis/NearestWashrooms";
        const options = {
            width: vizRef.current.offsetWidth,
            height: vizRef.current.offsetHeight,
            hideTabs: true,
            onFirstInteractive: () => {
                console.log("Tableau Viz has finished loading.");
            }
        };

        // Check if Tableau is available in the global scope
        if (window.tableau) {
            new window.tableau.Viz(vizRef.current, vizUrl, options);
        } else {
            console.error('Tableau JavaScript library is not loaded');
        }
    };

    return (
        <div ref={vizRef} style={{ width: '100%', height: '500px' }}>
            {/* Visualization will be inserted here */}
        </div>
    );
};

export default TableauViz;

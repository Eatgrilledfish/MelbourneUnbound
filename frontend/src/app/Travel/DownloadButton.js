import React from 'react';
import { Button } from '@mui/material';

// Helper function to format route data
const formatRouteData = (routeData) => {
  if (!routeData || routeData.features.length === 0) {
    return 'No route data available.';
  }

  const steps = routeData.features[0].properties.segments[0].steps;
  let routeText = 'Navigation Steps:\n';
  steps.forEach((step, index) => {
    routeText += `${index + 1}. ${step.instruction} - Distance: ${step.distance.toFixed(2)} meters, Duration: ${step.duration.toFixed(2)} seconds.\n`;
  });

  return routeText;
};

const DownloadButton = React.memo(({ routeData }) => {
  console.log("DownloadButton loaded", routeData);  // 这应该在你的控制台输出
  const handleDownload = () => {
    const formattedText = formatRouteData(routeData);
    const element = document.createElement('a');
    const file = new Blob([formattedText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "navigation_steps.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element); // Clean up
  };

  return (
    <Button variant="contained" color="primary" onClick={handleDownload} sx={{color: '#F2F2F2', backgroundColor: 'orange', '&:hover': { backgroundColor: '#e65100' }}}>
      Download Route
    </Button>
  );
});

export default DownloadButton;

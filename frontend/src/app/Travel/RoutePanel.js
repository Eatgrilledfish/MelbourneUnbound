import React from 'react';
import { Paper, List, ListItem, ListItemText, Typography, Divider } from '@mui/material';

const RoutePanel = ({ routeData }) => {
  if (!routeData || routeData.features.length === 0) {
    return <Typography variant="h6" color="error" padding={2}>No route data available.</Typography>;
  }

  const steps = routeData.features[0].properties.segments[0].steps;

  return (
    <Paper elevation={3} style={{ margin: '0px', padding: '10px', overflowY: 'auto', maxHeight: '500px' }}>
      <Typography variant="h5" component="h3" gutterBottom>
        Navigation Steps
      </Typography>
      <List dense>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={`${step.instruction}`}
                secondary={`Distance: ${step.distance.toFixed(2)} meters, Duration: ${step.duration.toFixed(2)} seconds`}
              />
            </ListItem>
            {index < steps.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default RoutePanel;

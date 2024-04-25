import { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Paper, Button, Box } from '@mui/material';
import StarRating from './star';

const BASE_IMAGE_URL = 'image/';

export default function MainContent() {
  const [parks, setparks] = useState([]);
  const [searchresult, setSearch] = useState([]);
  const [searchMode, setSearchMode] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://melbourneunbound.com/api/parks');
      if (!res.ok) {
        console.error("Failed to fetch parks:", res.status, res.statusText);
        return [];
      }
      const data = await res.json();
      setparks(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {

    }
  }, [searchMode, searchTerm]);



  if (!Array.isArray(parks) || parks.length === 0) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography>Loading...</Typography>
    </Box>;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Box mb={10}>
          <Typography variant="h4" gutterBottom>
            TOP ACCESSIBLE PARKS & GARDENS
          </Typography>
      </Box>
        <Grid container spacing={5} justifyContent="center">
          {parks.map((parks, index) => (
            <Grid item sx={{ ml: 15 }} spacing={4} key={index} xs={12} sm={12} md={12} lg={12} container alignItems="center" justifyContent="center">
              {/* 添加排名显示 */}
              <Grid item xs={1}>
                <Paper elevation={4} style={{ padding: '8px', textAlign: 'center' }}>
                  {index + 1}
                </Paper>
              </Grid>
              {/* 设置卡片在左边 */}
              <Grid item xs={3}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${BASE_IMAGE_URL}${parks.img}`}
                    alt={`Photo of ${parks.building_name}`}
                  />
                </Card>
              </Grid>
              {/* 设置文本在右边 */}
              <Grid item xs={8}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {parks.building_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {parks.street_address}
                  </Typography>
                  <Button sx={{ mt: 2 }} variant="contained" color="primary" href={parks.website} target="_blank" rel="noopener noreferrer">
                    Learn More
                  </Button>
                  <div>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1" style={{ marginRight: 8 }}>
                        Whats the Accessibility rating of the place you visited ? (optional)
                      </Typography>
                      <StarRating initialRating={3} />
                    </Box>
                  </div>
                </CardContent>
              </Grid>
            </Grid>
          ))}
        </Grid>
    </Box>
  );
}

import { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Paper, Button, Box } from '@mui/material';
import StarRating from './star';

const BASE_IMAGE_URL = 'image/';

export default function MainContent() {
  const [venues, setVenue] = useState([]);
  const [searchresult, setSearch] = useState([]);
  const [searchMode, setSearchMode] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://melbourneunbound.com/api/venues');
      if (!res.ok) {
        console.error("Failed to fetch venues:", res.status, res.statusText);
        return [];
      }
      const data = await res.json();
      setVenue(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {

    }
  }, [searchMode, searchTerm]);

  const fetchSearchData = async () => {
    try {
      setLoading(true); // Set loading to true at the start of fetch
      const response = await fetch(`https://melbourneunbound.com/api/venues?${searchMode}=${searchTerm}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSearch(data); // Update the state with new data
      setLoading(false); // Set loading to false after fetch is complete
    } catch (error) {
      console.error('Failed to fetch venues:', error);
      setLoading(false); // Ensure loading is set to false on error
    }
  };

  const handleSearchSubmit = () => {
    console.log(`Manual submit: Searching for ${searchTerm} by ${searchMode}`);
    if (searchTerm.trim()) {
      fetchSearchData();
    }
  };

  if (!Array.isArray(venues) || venues.length === 0) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography>Loading...</Typography>
    </Box>;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Box mb={10}>
        {searchresult.length > 0 ? (
          <Typography variant="h4" gutterBottom>
            SEARCH ACCESSIBLE Venues & Theatres 
          </Typography>
        ) : (
          <Typography variant="h4" gutterBottom>
            TOP 10 ACCESSIBLE Venues & Theatres 
          </Typography>
        )}
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search by ${searchMode}`}
          />
          <Button onClick={() => setSearchMode(searchMode === 'name' ? 'address' : 'name')}>
            Switch to {searchMode === 'name' ? 'Address' : 'Name'}
          </Button>
          <Button
            onClick={handleSearchSubmit}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </Box>
      {searchresult.length > 0 ? (
        // Render search results
        <Box >
          <Typography variant="h4" gutterBottom>
            <Grid container spacing={5} justifyContent="center">
              <Grid item sx={{ ml: 10 }} spacing={5} xs={12} sm={12} md={12} lg={12} container alignItems="center" justifyContent="center">
                {/* 添加排名显示 */}
                {/* 设置卡片在左边 */}
                <Grid item xs={3}>
                  <Card>
                    <CardMedia
                      component="img"
                      style={{
                        width: '100%',
                        maxWidth: '500px',
                        height: 'auto'
                      }}
                      image={`${BASE_IMAGE_URL}${searchresult[0].img}`}
                      alt={`Photo of ${searchresult[0].venue_name}`}
                    />
                  </Card>
                </Grid>
                {/* 设置文本在右边 */}
                <Grid item xs={8}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {searchresult[0].venue_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {searchresult[0].street_address}
                    </Typography>
                    <Button sx={{ mt: 2 }} variant="contained" color="primary" href={searchresult[0].website} target="_blank" rel="noopener noreferrer">
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
            </Grid>
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={5} justifyContent="center">
          {venues.map((venue, index) => (
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
                    image={`${BASE_IMAGE_URL}${venue.img}`}
                    alt={`Photo of ${venue.venue_name}`}
                  />
                </Card>
              </Grid>
              {/* 设置文本在右边 */}
              <Grid item xs={8}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {venue.venue_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {venue.street_address}
                  </Typography>
                  <Button sx={{ mt: 2 }} variant="contained" color="primary" href={venue.website} target="_blank" rel="noopener noreferrer">
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
      )}
    </Box>
  );
}

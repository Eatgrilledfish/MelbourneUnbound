import { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Paper, Button, Box } from '@mui/material';
import StarRating from './star';

const BASE_IMAGE_URL = 'image/';

export default function MainContent() {
  const [eateries, setEateries] = useState([]);
  const [searchresult, setSearch] = useState([]);
  const [searchMode, setSearchMode] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://melbourneunbound.com/api/top10eateries');
      if (!res.ok) {
        console.error("Failed to fetch eateries:", res.status, res.statusText);
        return [];
      }
      const data = await res.json();
      setEateries(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {

    }
  }, [searchMode, searchTerm]);

  const fetchSearchData = async () => {
    try {
      const response = await fetch(`https://melbourneunbound.com/api/eaterydrink?${searchMode}=${searchTerm}`);
      const data = await response.json();
      setSearch(data);
    } catch (error) {
      console.error('Failed to fetch eateries:', error);
    }
  };

  const handleSearchSubmit = () => {
    console.log(`Manual submit: Searching for ${searchTerm} by ${searchMode}`);
    if (searchTerm.trim()) {
      fetchSearchData();
      console.log(searchresult);
    }
  };

  if (!Array.isArray(eateries) || eateries.length === 0) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography>Loading...</Typography>
    </Box>;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Box mb={10}>
        {searchresult && searchresult.id > 0 ? (
          <Typography variant="h4" gutterBottom>
            Search ACCESSIBLE EATERIES & DRINK SPOTS
          </Typography>
        ) : (
          <Typography variant="h4" gutterBottom>
            TOP 10 ACCESSIBLE EATERIES & DRINK SPOTS
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
      {searchresult.id > 0 ? (
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
                      image={`${BASE_IMAGE_URL}${searchresult.photo}`}
                      alt={`Photo of ${searchresult.format_name}`}
                    />
                  </Card>
                </Grid>
                {/* 设置文本在右边 */}
                <Grid item xs={8}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {searchresult.format_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {searchresult.format_address}
                    </Typography>
                    <Button sx={{ mt: 2 }} variant="contained" color="primary" href={searchresult.website} target="_blank" rel="noopener noreferrer">
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
          {eateries.map((eatery, index) => (
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
                    image={`${BASE_IMAGE_URL}${eatery.photo}`}
                    alt={`Photo of ${eatery.format_name}`}
                  />
                </Card>
              </Grid>
              {/* 设置文本在右边 */}
              <Grid item xs={8}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {eatery.format_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {eatery.format_address}
                  </Typography>
                  <Button sx={{ mt: 2 }} variant="contained" color="primary" href={eatery.website} target="_blank" rel="noopener noreferrer">
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

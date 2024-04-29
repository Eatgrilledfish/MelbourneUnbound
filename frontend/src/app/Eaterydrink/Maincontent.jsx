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
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh">
      <Box sx={{ backgroundImage: `url(lights.jpg)`, // Set image background
        backgroundSize: 'cover', // Cover the entire background area
        width: '100%',borderRadius:'30px' }}>
        
      
        <Grid item xs={8} md={8} sx={{ 
              display: 'flex',       // Enable flexbox
              flexDirection: 'column', // Stack children vertically
              bgcolor:'white',ml:25,mt:10,mb:10,
              borderRadius:'30px'
              }} container spacing={5} justifyContent="center">
                <Grid container sx={{ justifyContent: 'flex' }}>
        
            <Grid item xs={8} md={12} sx={{ 
                display: 'flex',       // Enable flexbox
                flexDirection: 'column', // Stack children vertically
                bgcolor:'orange',borderTopLeftRadius:'30px',borderTopRightRadius:'30px'
                
                }}> 
                  <Typography variant="h2" sx={{ fontWeight:'bold',color: 'black', textAlign: 'left', position: 'relative' ,ml:18,mb:5,fontStyle:'italic',mt:10}}>
                    The Best
                  </Typography>
                  <Typography variant="h2" sx={{ fontWeight:'bold',color: 'black', textAlign: 'left', position: 'relative' ,ml:18,mb:5,fontStyle:'italic'}}>
                    among
                  </Typography>
                  <Typography variant="h2" sx={{ fontWeight:'bold',color: 'black', textAlign: 'left', position: 'relative' ,ml:18,mb:5,fontStyle:'italic'}}>
                    The Best
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'black', textAlign: 'left', position: 'relative' ,fontStyle:'italic',ml:18,mb:5,}}>
                    Top 10 Eateries
                  </Typography>

            </Grid>
          </Grid>
          {eateries.map((eatery, index) => (
            <Grid item sx={{}} spacing={4} key={index} xs={12} sm={12} md={12} lg={12} container alignItems="center" justifyContent="center">
             
              {/* 设置卡片在左边 */}
              <Grid item xs={3}sx={{ml:10}}>
                <Card>
                  <CardMedia
                    component="img"
                    style={{
                      borderRadius: '20px'
                    }}
                    height="140"
                    image={`${BASE_IMAGE_URL}${eatery.photo}`}
                    alt={`Photo of ${eatery.format_name}`}
                  />
                </Card>
              </Grid>
              {/* 设置文本在右边 */}
              <Grid item xs={8}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div"sx={{fontStyle:'italic',fontWeight:'bold'}}>
                  {index + 1}. {eatery.format_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {eatery.format_address}
                  </Typography>
                  <Button sx={{ mt: 2 ,backgroundColor: 'orange', color: 'black',fontStyle:'italic',mb:2}} variant="contained" color="primary" href={eatery.website} target="_blank" rel="noopener noreferrer">
                    Visit Site
                  </Button>
                  <div>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1" style={{ marginRight: 8 }}>
                        Been Here Before? Share your vote! (optional)
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
      {/* search */}
      <Box sx={{ bgcolor: 'grey.200', width: '100vw', m: 0, p: 0 ,mt:10}}>
        <Box sx={{mb:10}}>
          <Box sx={{ ml: 32, mt: 10, mb: 5 }}> {/* Increased top and bottom margin for this text section */}
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 5 }}>
              Want to go somewhere else?
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.secondary',fontStyle:'italic' }}>
              Double-check if they have what you need
            </Typography>
          </Box>
          <div style={{ marginLeft: '250px' }}> {/* Increased margin for better spacing */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search by ${searchMode}`}
              style={{ margin: '10px 0' }} // Additional margin for the input for better spacing
            />
            <Button sx={{ color: 'orange', m: 1 }} onClick={() => setSearchMode(searchMode === 'name' ? 'address' : 'name')}>
              Switch to {searchMode === 'name' ? 'Address' : 'Name'}
            </Button>
            <Button sx={{ backgroundColor: 'orange', color: 'black', m: 1 }}
              onClick={handleSearchSubmit}
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          </div>
        
        </Box>

        {searchresult.id > 0 && (
          <Box sx={{ mt: 5,ml:15,mb:10 }}> 
            <Typography variant="h4" gutterBottom>
              <Grid container spacing={5} justifyContent="center">
                <Grid item sx={{ ml: 10 }} xs={12} container alignItems="center" justifyContent="center">
                  {/* Card for image on the left */}
                  <Grid item xs={3}>
                    <Card>
                      <CardMedia
                        component="img"
                        style={{
                          width: '100%',
                          maxWidth: '500px',
                          height: 'auto',
                          borderRadius: '20px'
                        }}
                        image={`${BASE_IMAGE_URL}${searchresult.photo}`}
                        alt={`Photo of ${searchresult.format_name}`}
                      />
                    </Card>
                  </Grid>
                  {/* Text content on the right */}
                  <Grid item xs={8}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {searchresult.format_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {searchresult.format_address}
                      </Typography>
                      <Button sx={{ mt: 2, backgroundColor: 'orange', color: 'black',fontStyle:'italic'}} variant="contained" color="primary" href={searchresult.website} target="_blank" rel="noopener noreferrer">
                        Visit Site
                      </Button>
                      <div>
                        <Box display="flex" alignItems="center" mt={2}>
                          <Typography variant="body1" sx={{ marginRight: 2 }}>
                            What's the Accessibility rating of the place you visited? (optional)
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
        )}
      </Box>
      

    </Box>
  );
}

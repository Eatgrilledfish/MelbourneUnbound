import { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Paper, Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StarRating from './InteractiveStar';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/navigation'; 






const BASE_IMAGE_URL = 'image/';
const A_IMAGE_URL = 'accessible.png';
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1920,  // 调整xl断点以涵盖2K屏幕
      xxl: 2560  // 添加一个新的断点专门为2K屏幕
    }
  }
});



export default function MainContent() {
  const [parks, setparks] = useState([]);
  const [searchresult, setSearch] = useState([]);
  const [searchMode, setSearchMode] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();  // Use the navigate function
  const [loading, setLoading] = useState(false);
    const handleNavigation = (path) => () => {
    router.push(`/${path}`);  // Use navigate instead of router.push
  };

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

  const fetchSearchData = async () => {
    try {
      const response = await fetch(`https://melbourneunbound.com/api/parks?${searchMode}=${searchTerm}`);
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


  if (!Array.isArray(parks) || parks.length === 0) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography>Loading...</Typography>
    </Box>;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" position="relative">
      <Box sx={{ width: '100%', backgroundColor: 'orange', height: '120vh' }} />
      <Box sx={{ width: '100%', backgroundColor: 'white', height: '100px' }} />
      <Box sx={{ width: '100%', backgroundImage: `url(lights.jpg)`, backgroundSize: 'cover', height: '160vh' }}>

        <Box position="absolute" top={0} left={0} width="100%" minHeight="100vh" display="flex" flexDirection="column" alignItems="center">
          {/* 添加图片 */}
          <Box component="img" src={`${A_IMAGE_URL}`} sx={{
            position: 'absolute',
            left: 130,
            top: '40%',
            transform: 'translateY(-50%)', // 垂直居中
            maxWidth: '100%', // 确保图片不超过容器宽度
            height: '250vh'
          }} />
          <Grid item xs={8} md={8} sx={{
            display: 'flex',       // Enable flexbox
            flexDirection: 'column', // Stack children vertically
            ml: 30, mb: 10,
            borderRadius: '30px'
          }} container spacing={5} justifyContent="center">
            <Grid container sx={{ justifyContent: 'flex' }}>

              <Grid item xs={8} md={12} sx={{
                display: 'flex',       // Enable flexbox
                flexDirection: 'column', // Stack children vertically
                alignItems: 'flex',

              }}>
                <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'black', textAlign: 'left', position: 'relative', mb: 3, mt: 10,ml:10 }}>
                  The Best  Among  The Best
                </Typography>
               
                <Typography variant="h5" sx={{  color: 'gray', textAlign: 'left', position: 'relative', mr: 10, mb: 2, ml:10}}>
                  Top 10 Eateries
                </Typography>
                <Typography  sx={{fontSize:'17px', color: 'black', textAlign: 'left', position: 'relative', mr: 10, mb: 2,ml:10 }}>
                 Here are the top 10 accessible spots in Melbourne, selected for their excellent accessibility features and positive feedback from wheelchair users.
                </Typography>
                <Typography  sx={{ fontSize:'17px',color: 'black', textAlign: 'left', position: 'relative', mr: 10, mb: 2,ml:10 }}>
                 Whether you're dining out, catching a show, enjoying nature, or shopping, these locations offer a comfortable and enjoyable experience.

                </Typography>
                <Typography  sx={{ fontSize:'17px',color: 'black', textAlign: 'left', position: 'relative', mr: 10, mb: 8,ml:10 }}>
                 You can also see what other wheelchair users are saying about these places and leave your own reviews if you choose.
                </Typography>


              </Grid>
            </Grid>
            <Box sx={{ bgcolor: 'white', ml: 8, width: '1000px', borderRadius: '30px', mb: 10 }} >
              {parks.map((parks, index) => (
                <Grid item sx={{ mt: 1 }} spacing={4} key={index} xs={12} sm={12} md={12} lg={12} container alignItems="center" justifyContent="center">

                  {/* 设置卡片在左边 */}
                  <Grid item xs={3} sx={{ ml: 10 }}>
                    <Card>
                      <CardMedia
                        component="img"
                        style={{
                          height: '200px',
                          width: '100%',  // 设置图片宽度为100%

                          borderRadius: '20px'
                        }}
                        height="140"
                        image={`${BASE_IMAGE_URL}${parks.img}`}
                        alt={`Photo of ${parks.building_name}`}
                      />
                    </Card>
                  </Grid>
                  {/* 设置文本在右边 */}
                  <Grid item xs={8}>
                    <CardContent sx={{ flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                      <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                        {index + 1}. {parks.building_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {parks.street_address}
                      </Typography>
                      <Typography color="rgba(0, 0, 0, 0.5)" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                        <StarIcon sx={{ color: "rgb(245, 197, 24)" }} />
                        <span style={{ color: 'rgba(0, 0, 0, 0.65)' }}>{parks.final_score.toFixed(2)}</span>/5  Accessible Rating
                      </Typography>

                      <Button sx={{ mt: 2, color: '#F2F2F2', backgroundColor: 'orange', '&:hover': { backgroundColor: '#e65100' }, mb: 2 }} variant="contained" color="primary" href={parks.website} target="_blank" rel="noopener noreferrer">
                        Visit Site
                      </Button>
                      <div>
                        <Box display="flex" alignItems="center">
                          <Typography variant="body1" style={{ marginRight: 8 }}>
                            Been Here Before? Share your vote! (optional)
                          </Typography>
                          <StarRating />
                        </Box>
                      </div>
                    </CardContent>
                  </Grid>
                </Grid>
              ))}
            </Box>

          </Grid>
        </Box>
      </Box>
      <Box sx={{ display: 'flex',alignItems: 'center', mt:60 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ width: '100%', margin: 0 }}>
          {/* 左侧内容区域 */}
          <Grid item xs={10} md={5} sx={{ textAlign: 'left', padding: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Know where you’re going but dont know how to get there?
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 3 }}>
              Find your nearest accessible public transport stops here
            </Typography>
            <Button variant="contained" sx={{ color: '#F2F2F2', backgroundColor: 'orange', '&:hover': { backgroundColor: '#e65100' } }} onClick={handleNavigation('Travel')}>
              Navigate
            </Button>
          </Grid>

          {/* 右侧图片区域 */}
          <Grid item xs={10} md={5} sx={{ display: 'flex', justifyContent: 'center'}}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="194"
                image="transportlink.jpg"  // 替换为你的图片URL
                alt="Descriptive Alt Text"
              />
            </Card>
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
}

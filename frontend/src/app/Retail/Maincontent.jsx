import { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Grid, Paper, Button, Box } from '@mui/material';
import StarRating from './InteractiveStar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; 

const BASE_IMAGE_URL = 'retail_image/';
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

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.5
    }
  }
};

export default function MainContent() {
  const [retails, setRetails] = useState([]);
  const [searchresult, setSearch] = useState(null);
  const [searchMode, setSearchMode] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();  // Use the navigate function
  const handleNavigation = (path) => () => {
    router.push(`/${path}`);  // Use navigate instead of router.push
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://melbourneunbound.com/api/retails');
      if (!res.ok) {
        console.error("Failed to fetch retails:", res.status, res.statusText);
        return [];
      }
      const data = await res.json();
      setRetails(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {

    }
  }, [searchMode, searchTerm]);

  const fetchSearchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://melbourneunbound.com/api/retails?${searchMode}=${searchTerm}`);
      if (!response.ok) throw new Error('Network response was not ok.');
      const data = await response.json();
      console.log('we get the data',data)
      if (data[0].message === "No eateries found") {
        setSearch([]); // 使用 setSearch 来设置空数组表示没有结果
      } else {
        setSearch(data[0]);
        console.log('this is data',data[0])
      }
    } catch (error) {
      console.error('Failed to fetch eateries:', error);
      setSearch([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = () => {
    console.log(`Manual submit: Searching for ${searchTerm} by ${searchMode}`);
    if (searchTerm.trim()) {
      fetchSearchData();
    }
  };

  if (!Array.isArray(retails) || retails.length === 0) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography>Loading...</Typography>
    </Box>;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" position="relative">
      <Box sx={{ width: '100%', backgroundColor: 'orange', height: '170vh' }} />
      <Box sx={{ width: '100%', backgroundColor: 'white', height: '100px' }} />
      <Box sx={{ width: '100%', backgroundImage: `url(lights.jpg)`, backgroundSize: 'cover', height: '200vh' }}>
        
      <Box position="absolute" top={0} left={0} width="100%" minHeight="100vh" display="flex" flexDirection="column" alignItems="center">
         {/* 添加图片 */}
        <Box component="img" src={`${A_IMAGE_URL}`} sx={{
          position: 'absolute',
          left: 130,
          top: '45%', 
          transform: 'translateY(-50%)', // 垂直居中
          maxWidth: '100%', // 确保图片不超过容器宽度
          height: '300vh'
        }} />
        <Grid item xs={8} md={8} sx={{ 
              display: 'flex',       // Enable flexbox
              flexDirection: 'column', // Stack children vertically
              ml:30,mb:10,
              borderRadius:'30px'
              }} container spacing={5} justifyContent="center">
                <Grid container sx={{ justifyContent: 'flex' }}>
        
            <Grid item xs={8} md={12} sx={{ 
                display: 'flex',       // Enable flexbox
                flexDirection: 'column', // Stack children vertically
                alignItems: 'flex-end',
                
                }}> 
                  <Typography variant="h2" sx={{ fontWeight:'bold',color: 'black', textAlign: 'right', position: 'relative' ,mr:18,mb:5,mt:10}}>
                    The Best
                  </Typography>
                  <Typography variant="h2" sx={{ fontWeight:'bold',color: 'black', textAlign: 'right', position: 'relative' ,mr:18,mb:5}}>
                    among
                  </Typography>
                  <Typography variant="h2" sx={{ fontWeight:'bold',color: 'black', textAlign: 'right', position: 'relative' ,mr:18,mb:5}}>
                    The Best
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'black', textAlign: 'right', position: 'relative' ,mr:18,mb:8,}}>
                    Top 10 Retails
                  </Typography>

            </Grid>
          </Grid>
          <Box sx={{bgcolor:'white',ml:8,width:'1000px',borderRadius:'30px' ,mb:10}} >
            {retails.map((retail, index) => (
            <Grid item sx={{mt:1}} spacing={4} key={index} xs={12} sm={12} md={12} lg={12} container alignItems="center" justifyContent="center">
             
              {/* 设置卡片在左边 */}
              <Grid item xs={3}sx={{ml:10}}>
                <Card>
                  <CardMedia
                    component="img"
                    style={{
                      height: '200px',
                      width: '100%',  // 设置图片宽度为100%
                      
                      borderRadius: '20px'
                    }}
                    height="140"
                    image={`${BASE_IMAGE_URL}${retail.photo_filename}`}
                    alt={`Photo of ${retail.name}`}
                  />
                </Card>
              </Grid>
              {/* 设置文本在右边 */}
              <Grid item xs={8}>
                <CardContent sx={{  flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <Typography gutterBottom variant="h5" component="div"sx={{fontWeight:'bold'}}>
                  {index + 1}. {retail.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {retail.address}
                  </Typography>
                  <Typography color="rgba(0, 0, 0, 0.5)" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                        <StarIcon sx={{ color: "rgb(245, 197, 24)" }} />
                        <span style={{ color: 'rgba(0, 0, 0, 0.65)' }}>{retail.final_score.toFixed(2)}</span>/5  Accessible Rating
                      </Typography>


                  <Button sx={{ mt: 2 ,backgroundColor: 'orange', color: 'black',mb:2}} variant="contained" color="primary" href={retail.website} target="_blank" rel="noopener noreferrer">
                    Visit Site
                  </Button>
                  <div>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body1" style={{ marginRight: 8 }}>
                        Been Here Before? Share your review! (optional)
                      </Typography>
                      <StarRating initialRating={3} />
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
      {/* search */}
      <Box sx={{ bgcolor: 'grey.200', width: '100vw', m: 0, p: 0 ,
                mt: {
                  xs: 115,   // 在小屏幕上 marginTop 为 20px
                  md: 100,   // 在中等屏幕上 marginTop 为 50px
                  lg: 100,  // 在大屏幕上 marginTop 为 100px
                  xl: 65,  // 在超大屏幕上 marginTop 为 150px
                  xxl: 0,  // 在2K屏幕上 marginTop 为 200px
                }
      }}>
        <Box sx={{mb:10}}>
          <Box sx={{ ml: 32, mt: 10, mb: 5 }}> {/* Increased top and bottom margin for this text section */}
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 5 }}>
              Want to go somewhere else?
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.secondary' }}>
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

        {searchresult?.id > 0  && (
                      <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
          <Box sx={{bgcolor: 'white', mt: 0,pl:20,mb:10 }}> 
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
                          maxWidth: '400px',
                          height: 'auto',
                          borderRadius: '20px'
                        }}
                        image={`${BASE_IMAGE_URL}${searchresult.photo_filename}`}
                        alt={`Photo of ${searchresult.name}`}
                      />
                    </Card>
                  </Grid>
                  {/* Text content on the right */}
                  <Grid item xs={8} sx={{ml:'100px'}}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {searchresult.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {searchresult.address}
                      </Typography>
                      <Typography color="rgba(0, 0, 0, 0.5)" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                        <StarIcon sx={{ color: "rgb(245, 197, 24)" }} />
                        <span style={{ color: 'rgba(0, 0, 0, 0.65)' }}>{searchresult.final_score.toFixed(2)}</span>/5  Accessible Rating
                      </Typography>
                      <Button sx={{ mt: 2, backgroundColor: 'orange', color: 'black'}} variant="contained" color="primary" href={searchresult.website} target="_blank" rel="noopener noreferrer">
                        Visit Site
                      </Button>
                      <div>
                        <Box display="flex" alignItems="center" mt={2}>
                          <Typography variant="body1" sx={{ marginRight: 2 }}>
                            What's the Accessibility rating of the place you visited? (optional)
                          </Typography>
                          <StarRating  />
                        </Box>
                      </div>
                    </CardContent>
                  </Grid>
                </Grid>
              </Grid>
            </Typography>
          </Box>
          </motion.div>
        )}
            {searchresult === null ? (
      null // 初始状态或未进行搜索，不显示错误消息
    ) : (
      searchresult.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', width: '100%' }}
        >
          <Typography variant="h6" sx={{ color: 'grey.600' }}>
            Sorry, we didn't find any results for your search.
          </Typography>
        </motion.div>
      )
    )}
      </Box>
      <Box sx={{ display: 'flex',alignItems: 'center', }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ width: '100%', margin: 0 }}>
          {/* 左侧内容区域 */}
          <Grid item xs={10} md={5} sx={{ textAlign: 'left', padding: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
              Know where you’re going but dont know how to get there?
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 3 }}>
              Find your nearest accessible public transport stops here
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: 'orange', color: 'black' }} onClick={handleNavigation('Travel')}>
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

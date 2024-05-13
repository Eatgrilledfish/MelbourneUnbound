"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './Map';
import { Dialog, DialogContent, Box, Button, IconButton,Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from 'lodash';
import SearchBar from '../../components/main/homesearch'; // Adjust path to fit your file structure
import Footer from '../../components/main/Footer';
import { AspectRatio } from './AspectRatio';
import Osmmap from './OSMmap';
import CloseIcon from '@mui/icons-material/Close'; // 导入关闭图标

import { GoogleMapsProvider } from './GoogleMapsProvider';
import TableauViz from './TableauViz';
import { Padding } from '@mui/icons-material';
import { styled } from '@mui/system';


const Home = () => {
  const [startAddress, setStartAddress] = useState('');
  const [destiAddress, setDestiAddress] = useState('');
  const [addressesStart, setAddressesStart] = useState([]);
  const [addressesDesti, setAddressesDesti] = useState([]);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [loadingStart, setLoadingStart] = useState(false);  // 新增一个状态用于跟踪加载
  const [loadingDest, setLoadingDest] = useState(false);  // 新增一个状态用于跟踪加载
  const [apiLoaded, setApiLoaded] = useState(false); // Track API load status
  const [searchCount, setSearchCount] = useState(0);  // 使用计数器作为触发器
  const [currentMap, setCurrentMap] = useState('Osmmap'); // 'Osmmap' 或 'Map'
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(true); // 控制弹窗显示的状态

  // 动画变量
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false); // 在5秒后设置open为false，从而关闭弹窗
    }, 5000); // 5000毫秒等于5秒

    return () => clearTimeout(timer); // 清理计时器，以避免内存泄漏
  }, []); // 空数组确保这个效果只在组件首次渲染时运行

  const modalVariants = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const toggleMap = () => {
    setIsLoading(true);
    setCurrentMap(currentMap === 'Osmmap' ? 'Map' : 'Osmmap');
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 假设加载地图需要2秒钟
  };






  const fetchAddressesStart = debounce((searchText) => {
    if (searchText.trim() !== "") {
      setLoadingStart(true);
      axios.get(`https://melbourneunbound.com/api/addresses?search=${encodeURIComponent(searchText)}`)
        .then(response => {
          setAddressesStart(response.data || []);
          setLoadingStart(false);
        })
        .catch(error => {
          console.error('Error fetching start addresses:', error);
          setAddressesStart([]);
          setLoadingStart(false);
        });
    } else {
      setAddressesStart([]);
      setLoadingStart(false);
    }
  }, 300);

  const fetchAddressesDesti = debounce((searchText) => {
    if (searchText.trim() !== "") {
      setLoadingDest(true);
      axios.get(`https://melbourneunbound.com/api/addresses?search=${encodeURIComponent(searchText)}`)
        .then(response => {
          setAddressesDesti(response.data || []);
          setLoadingDest(false);
        })
        .catch(error => {
          console.error('Error fetching destination addresses:', error);
          setAddressesDesti([]);
          setLoadingDest(false);
        });
    } else {
      setLoadingDest(false);
      setAddressesDesti([]);
    }
  }, 300);

  const handleSearch = () => {
    if (startAddress && destiAddress) {
      setOrigin(startAddress);
      setDestination(destiAddress);
      setSearchCount(prev => prev + 1);  // 递增计数器触发更新
    }
  };
  const handleSearch2 = () => {
    if (startAddress) {
      setOrigin(startAddress);
      setSearchCount(prev => prev + 1);Explore  // 递增计数器触发更新
    }
  };

  // Additional styles for the rectangles and text alignment
  const rectangleStyles = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '300px', // 设置父容器高度
    marginTop:'100px'
  };
  
  const greenRectangleStyles = {
    backgroundColor: '#347474',
    width: '100px', // 设置宽度比例
    height: '400px' // 设置为父容器高度的100%
  };
  
  const orangeRectangleStyles = {
    backgroundColor: 'orange',
    width: '700px', // 设置宽度比例
    height: '400px', // 设置为父容器高度的100%
    position: 'relative', // 确保可以相对此容器定位图片
    display: 'flex',
    justifyContent: 'space-between',
    
    overflow: 'visible' // 确保超出部分可见
  };
  
  const [style, setStyle] = useState({
    position: 'absolute',
    bottom: '-400px',
    right: '0',
    width: '800px',
    height: '400px',
    objectFit: 'cover',
    zIndex: '-1',
  });
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setStyle(prevStyle => ({
          ...prevStyle,
          width: '100%',
          height: '200px',
          
        }));
      } else {
        setStyle(prevStyle => ({
          ...prevStyle,
          width: '800px',
          height: '400px',
          bottom: '-400px',
        }));
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // const travelwheelImageStyle = {
  //   left: '0',
  //   marginTop:'100px',
  //   width: '70%', // 调整尺寸
  //   height: '600px', // 调整尺寸
  // };
  const [imageStyle, setImageStyle] = useState({
    left: '0',
    marginTop: '100px',
    width: '70%',
    height: '600px',
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setImageStyle(prevStyle => ({
          ...prevStyle,
          width: '100%', // 小屏幕时宽度调整为100%
          height:'200px'
        }));
      } else {
        setImageStyle(prevStyle => ({
          ...prevStyle,
          width: '70%', // 大屏幕恢复默认宽度
          height:'600px'
        }));
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // 初始化时立即调用

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [fontSize, setFontSize] = useState('25px');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setFontSize('18px');  // 小于768px时，字体大小为18px
      } else {
        setFontSize('25px');  // 大于或等于768px时，字体大小为25px
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();  // 初始化检查

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [flexDirection, setFlexDirection] = useState('row');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleMediaQueryChange(e) {
      if (e.matches) {
        setFlexDirection('column');
      } else {
        setFlexDirection('row');
      }
    }

    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  ///end text
  const [textStyle, setTextStyle] = useState({
    position: 'absolute',
    top: '20px',
    left: '20px',  // 默认左边距
    textAlign: 'left',  // 默认文本对齐方式
    marginLeft: '100px',  // 默认外边距
    marginTop: '100px',  // 默认顶部外边距
    color: 'white',
    fontSize: '50px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        // 当屏幕宽度小于768px时，调整样式为居中
        setTextStyle({
          position: 'absolute',
          top: '50%',  // 居中定位
          left: '50%',  // 居中定位
          transform: 'translate(-50%, -50%)',  // 使用transform来确保精确居中
          textAlign: 'center',  // 文本居中
          marginLeft: '0',  // 移除左边距
          marginTop: '0',  // 移除顶部外边距
          color: 'white',
          fontSize: '30px',  // 可以根据需要调整字体大小
          textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
        });
      } else {
        // 当屏幕宽度大于或等于768px时，恢复默认样式
        setTextStyle({
          position: 'absolute',
          top: '20px',
          left: '20px',
          textAlign: 'left',
          marginLeft: '100px',
          marginTop: '100px',
          color: 'white',
          fontSize: '50px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
        });
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // 初始化时调用一次以设置初始样式

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="privacy-modal"
            aria-describedby="privacy-message"
            PaperProps={{
              sx: {
                backgroundColor: '#BFBFBF',// 调整为浅灰色背景
                minWidth: '500px',
                display: 'flex', // Use flexbox to allow centering
                flexDirection: 'column', // Stack children vertically
                justifyContent: 'center', // Center vertically
                alignItems: 'center', // Center horizontally
                padding: '10px'
              }
            }}
          >
            <DialogContent>
            <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                style={{
                  position: 'absolute', // 绝对定位
                  right: 8, // 从右侧8px的位置
                  top: 8, // 从顶部8px的位置
                  color: '#333' // 设置颜色，根据需要调整
                }}
              >
                <CloseIcon />
              </IconButton>
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  borderRadius: '10px', // 圆角边框
                  padding: '20px' // 内边距
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Data Privacy
                </Typography>
                <Typography variant="body2" gutterBottom>
                  We collect and process location data solely for the purpose of providing accessible travel information in Melbourne. Your data is securely stored and used in accordance with our privacy policy.
                </Typography>
                <Typography variant="h6" gutterBottom>
                  CBD Restriction
                </Typography>
                <Typography variant="body2">
                  Our current service coverage is limited to the Central Business District (CBD) of Melbourne.
                </Typography>
                
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    <Box style={{ display: 'flex', flexDirection: 'column', height: '100vh' ,justifyContent: 'space-between'}}>
      <Box mb={20}><SearchBar /></Box>
      <Box>
        <Box
        sx={{
          textAlign: 'left',
          
          marginLeft: {
            xs: '20px',   
            sm: '50px',   
            md: '100px',  
            lg: '200px',  
            xl: '200px',  
            
          }
        }}>
          <h1 style={{ fontSize: '40px',alignItems: 'center' }}>Accessible Transport</h1>
          <p style={{ fontSize: '14px', color: 'gray', marginTop: '-20px', marginBottom: '50px' ,alignItems: 'center'}}>
            Know your options and plan ahead
          </p>
          <Box sx={{ fontSize: fontSize, marginTop: '5px', marginBottom: '40px',marginRight: {
            xs: '20px',   
            sm: '50px',   
            md: '200px',  
            lg: '400px',  
            xl: '400px',  }, alignItems: 'center' }}>
            Find <strong>accessible tram stops</strong> and convenient <strong>level walkways</strong> for travel. Adventure independently by knowing where to find <strong>accessible public washrooms</strong> wherever you are. Begin your journey now!
          </Box>
        </Box>
        {/* Green and Orange Rectangle Layout */}
        <div style={rectangleStyles}>
          <div style={greenRectangleStyles}></div>
            <div style={orangeRectangleStyles}>
              <div style={{ textAlign: 'right',marginTop:'70px',marginRight:'70px' ,marginLeft:'30px'}}>
                <h2 style={{fontSize:'40px',marginTop:'80px',opacity: 1,background: 'linear-gradient(to bottom, #347474, #CCCCCC)', // 从深蓝绿色渐变到浅灰色
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  }}>YOUR</h2>
                <h2 style={{fontSize:'40px',marginTop:'-40px',background: 'linear-gradient(to bottom, #347474, #CCCCCC)', // 从深蓝绿色渐变到浅灰色
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  }}>JOB</h2>
                <p>Enter your location, destination, and mode of journey.</p>
              </div>
              <div style={{ textAlign: 'left',marginTop:'20px' ,marginLeft:'50px'}}>
                <h2 style={{fontSize:'40px',background: 'linear-gradient(to bottom, #347474, #CCCCCC)', // 从深蓝绿色渐变到浅灰色
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',}}>OUR</h2>
                <h2 style={{fontSize:'40px',marginTop:'-40px',background: 'linear-gradient(to bottom, #347474, #CCCCCC)', // 从深蓝绿色渐变到浅灰色
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',}}>JOB</h2>
                <p>Highlight accessible tram stops, footpaths, and public washrooms near you.</p>
              </div>
              
            </div>
            <img src="tram.jpg" alt="Tram" style={style} />
        </div>
        <div style={{ textAlign: 'center', marginTop: '500px' }}>
          <h1 style={{ fontSize: '40px' }}>The Tram Way</h1>
          <p style={{ fontSize: '20px', marginTop: '50px' }}>
            We scour through all tram stops in the CBD and find you the closest low floor tram stops with low floors
          </p>
          <div style={{ display: 'flex', flexDirection, justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: flexDirection === 'column' ? '0' : '0' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: 'orange', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px', marginRight: '20px' }}>Closest Low-Floor Tram Stops</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: flexDirection === 'column' ? '0' : '0' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: 'orange', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px', marginRight: '20px' }}>Servicing Routes</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: flexDirection === 'column' ? '0' : '0' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: 'orange', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px' }}>Optimal Footpaths to Stop</p>
            </div>
          </div>
        </div>
       <img src="travelwheel.jpg" alt="Travel Wheel" style={imageStyle} />
       <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h1 style={{ fontSize: '40px' }}>The Pedestrian Way</h1>
          <p style={{ fontSize: '20px', marginTop: '50px' }}>
            We meticulously analyze every potential route for your journey, hand-selecting the one with the least steepness.
          </p>
          <div style={{ display: 'flex', flexDirection, justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: flexDirection === 'column' ? '0' : '0' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: '#347474', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px', marginRight: '20px' }}>Coloured Steepness Indicator </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: flexDirection === 'column' ? '0' : '0' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: '#347474', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px', marginRight: '20px' }}>Slope Graph</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: flexDirection === 'column' ? '0' : '0' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: '#347474', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px' }}>Detailed Navigation Instructions</p>
            </div>
          </div>
        </div>        
      
        <h1 style={{ fontSize: '40px' ,marginTop:'100px',textAlign: 'center'}}>Explore Melbourne CBD</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <Autocomplete
            disablePortal
            options={addressesStart}
            onInputChange={(event, newInputValue) => fetchAddressesStart(newInputValue)}
            onChange={(event, newValue) => setStartAddress(newValue)}
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={(option) => option.toString()}
            loading={loadingStart}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Start Address" variant="outlined" InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loadingStart ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }} />}
          />
          {currentMap === 'Osmmap' && (
          <Autocomplete
            disablePortal
            options={addressesDesti}
            onInputChange={(event, newInputValue) => fetchAddressesDesti(newInputValue)}
            onChange={(event, newValue) => setDestiAddress(newValue)}
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={(option) => option.toString()}
            loading={loadingDest}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Destination Address" variant="outlined" InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loadingDest ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }} />}
          />)}
          {currentMap === 'Osmmap' ? (<button onClick={handleSearch}>Enter</button>):(<button onClick={handleSearch2}>Enter</button>)}
          <Button variant="contained" onClick={toggleMap} disabled={isLoading}>
          Switch Map
          {isLoading && <CircularProgress size={24} style={{ marginLeft: 10, color: 'white' }} />}
        </Button>
        </div>
      </Box>
      <div style={{ width: '100%' }}>
        <div style={{ position: 'relative', width: '100%', height: '500px' }}>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </div>
          ) :(
          currentMap === 'Osmmap' ? (
          <Osmmap
            style={{ width: '100%', height: '100%' }}
            geoJsonUrl="footpath-steepness.geojson"
            origin={origin}
            destination={destination}
            searchTrigger={searchCount}
          />
        ) : (
          <Map
            style={{ width: '100%', height: '100%' }}
            originInput={origin}
            searchTrigger={searchCount}
          />
        )
          )}
        
        </div>
      </div>

      {/* <TableauViz /> */}
      <div style={{ textAlign: 'center', marginTop: '150px' }}>
          <h1 style={{ fontSize: '40px' }}>ACCESS PUBLIC WASHROOMS</h1>
          <p style={{ fontSize: '20px', marginTop: '50px' }}>
            We filter through dozens of public washrooms in CBD to bring you the closest accessible ones
          </p>
          <div style={{ display: 'flex', flexDirection, justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: flexDirection === 'column' ? '0' : '0' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: 'orange', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px', marginRight: '20px' }}>Gender Descriptions</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: flexDirection === 'column' ? '0' : '0' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: 'orange', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px', marginRight: '20px' }}>Custom Radius</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: flexDirection === 'column' ? '0' : '0' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: 'orange', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px' }}>Detailed Address</p>
            </div>
          </div>
        </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <iframe 
          width="1100px" 
          height="600px" 
          src="https://lookerstudio.google.com/embed/reporting/6a62475b-3519-4fc9-ad0a-e41d4f042c17/page/2cszD" 
          frameborder="0" 
          style={{ border: '0' }}
          allowfullscreen 
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox">
        </iframe>
      </div>

      <div style={{ width: '100%', height: '500px', position: 'relative', marginTop: '100px' }}>
        <img src="travelend.jpg" alt="Travel End" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
        <div style={textStyle}>
          <h1 style={{ marginTop: '50px', fontSize: '50px' }}>Travel Ready</h1>
          <h2 style={{ marginTop: '50px',marginLeft:'50px', fontSize: '40px' }}>MelbourneUnbound</h2>
        </div>
      </div>

      

       <Box sx={{ mt: 10 }}>
  <Footer />
      

    </Box>
   
</Box>

    </>
  );
};

export default Home;

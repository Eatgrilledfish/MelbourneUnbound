"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './Map';
import { Box,Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from 'lodash';
import SearchBar from '../../components/main/homesearch'; // Adjust path to fit your file structure
import Footer from '../../components/main/Footer';
import { AspectRatio } from './AspectRatio';
import Osmmap from './OSMmap';
import CircularProgress from '@mui/material/CircularProgress';
import { GoogleMapsProvider } from './GoogleMapsProvider';
import TableauViz from './TableauViz';
import { Padding } from '@mui/icons-material';


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
      setSearchCount(prev => prev + 1);  // 递增计数器触发更新
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
  
  const tramImageStyle = {
    position: 'absolute',
    bottom: '-400px', // 根据需要调整，使图片部分超出容器底部
    right: '0',
    width: '800px', // 调整尺寸
    height: '400px', // 调整尺寸
    objectFit: 'cover',
    zIndex: '-1', // 确保图片位于其他内容下方
    
  };
  const travelwheelImageStyle = {
    left: '0',
    marginTop:'100px',
    width: '1000px', // 调整尺寸
    height: '600px', // 调整尺寸
   
    
    
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <Box mb={20}><SearchBar /></Box>
      <div>
        <div style={{ textAlign: 'left', marginLeft: '200px' }}>
          <h1 style={{ fontSize: '40px' }}>Accessible Transport</h1>
          <p style={{ fontSize: '14px', color: 'gray', marginTop: '-20px', marginBottom: '50px' }}>
            Know your options and plan ahead
          </p>
          <p style={{ fontSize: '25px', marginTop: '5px', marginBottom: '40px', marginRight: '400px' }}>
            Find <strong>accessible tram stops</strong> and convenient <strong>level walkways</strong> for travel. Adventure independently by knowing where to find <strong>accessible public washrooms</strong> wherever you are. Begin your journey now!
          </p>
        </div>
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
            <img src="tram.jpg" alt="Tram" style={tramImageStyle} />
        </div>
        <div style={{ textAlign: 'center', marginTop: '500px' }}>
          <h1 style={{ fontSize: '40px' }}>The Tram Way</h1>
        
          <p style={{ fontSize: '25px', marginTop: '50px'}}>
            We scour through all tram stops in the CBD and find you the closest low floor tram stops with low floors
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '60px' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: 'orange', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px' }}>Closest Low-Floor Tram Stops</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '60px' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: 'orange', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px' }}>Servicing Routes</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: 'orange', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px' }}>Optimal Footpaths to Stop</p>
            </div>
          </div>
           
        </div>
       <img src="travelwheel.jpg" alt="Tram" style={travelwheelImageStyle} />
       <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h1 style={{ fontSize: '40px' }}>The Pedestrian Way</h1>
        
          <p style={{ fontSize: '25px', marginTop: '50px'}}>
            We meticulously analyze every potential route for your journey, hand-selecting the one with the least steepness.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '60px' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: '#347474', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px' }}>Coloured Steepness Indicator </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '60px' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: '#347474', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px' }}>Slope Graph</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: '#347474', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px' }}>Detailed Navigation Instructions</p>
            </div>
          </div>    
        </div>         
      
        <h1 style={{ fontSize: '40px' ,marginTop:'100px',textAlign: 'left', marginLeft: '200px'}}>Explore Melbourne CBD</h1>
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
      </div>
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
      {/* <div>
        <h1>Dashboard</h1>
        <AspectRatio ratio={16 / 9} className="w-full mt-4">
          <iframe
            src="https://public.tableau.com/views/AccessibleWashroomsAnalysis/NearestWashrooms"
            frameBorder="0"
            className="h-full w-full overflow-hidden rounded-lg border bg-muted"

          />
        </AspectRatio>
      </div> */}

      {/* <TableauViz /> */}
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h1 style={{ fontSize: '40px' }}>ACCESS PUBLIC WASHROOMS</h1>
        
          <p style={{ fontSize: '25px', marginTop: '50px'}}>
            We filter through dozens of public washrooms in CBD to bring you the closest accessible ones
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '60px' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: 'orange', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px' }}>Gender Descriptions</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '60px' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: 'orange', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px' }}>Custom Radius</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '25px', height: '25px', backgroundColor: 'orange', marginRight: '10px' }}></div>
              <p style={{ fontSize: '20px' }}>Detailed Address</p>
            </div>
          </div>
      </div>

      <div style={{ width: '100%', height: '500px', position: 'relative',marginTop:'100px' }}>
        <img src="travelend.jpg" alt="Travel End" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <h1 style={{ color: 'white', fontSize: '50px', textShadow: '2px 2px 4px rgba(0,0,0,0.6)' ,marginLeft:'100px',marginTop:'100px'}}>Travel Ready</h1>
          <h2 style={{ color: 'white', fontSize: '40px', textShadow: '2px 2px 4px rgba(0,0,0,0.6)' ,marginLeft:'150px',marginTop:'50px'}}>MelbourneUnbound</h2>
        </div>
      </div>

      

      <Box mt={10}><Footer /></Box>
      

    </div>
  );
};

export default Home;

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <Box mb={20}><SearchBar /></Box>
      <div>
        <h1>Explore Melbourne CBD</h1>
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
      <Box mt={30}><Footer /></Box>

    </div>
  );
};

export default Home;

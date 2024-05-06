"use client";
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Map from './Map';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from 'lodash';
import SearchBar from '../../components/main/homesearch'; // Adjust path to fit your file structure
import Footer from '../../components/main/Footer';
import { AspectRatio } from './AspectRatio';
import TableauViz from  './TableauViz';


const Home = () => {
  const [startAddress, setStartAddress] = useState('');
  const [destiAddress, setDestiAddress] = useState('');
  const [addressesStart, setAddressesStart] = useState([]);
  const [addressesDesti, setAddressesDesti] = useState([]);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [travelMode, setTravelMode] = useState(null); // Initialize to null
  const [apiLoaded, setApiLoaded] = useState(false); // Track API load status


  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDjQXyYlP5QOFLFJ58xocind5smlnaC3mA&libraries=places";
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => {
        setApiLoaded(true);
        setTravelMode(google.maps.TravelMode.WALKING); // Set travel mode after API is loaded
      };
    } else {
      setApiLoaded(true);
      setTravelMode(google.maps.TravelMode.WALKING);
    }
  }, []);

  



  const fetchAddressesStart = debounce((searchText) => {
    if (searchText.trim() !== "") {
      axios.get(`https://melbourneunbound.com/api/addresses?search=${encodeURIComponent(searchText)}`)
        .then(response => setAddressesStart(response.data || []))
        .catch(error => {
          console.error('Error fetching start addresses:', error);
          setAddressesStart([]);
        });
    } else {
      setAddressesStart([]);
    }
  }, 300);

  const fetchAddressesDesti = debounce((searchText) => {
    if (searchText.trim() !== "") {
      axios.get(`https://melbourneunbound.com/api/addresses?search=${encodeURIComponent(searchText)}`)
        .then(response => setAddressesDesti(response.data || []))
        .catch(error => {
          console.error('Error fetching destination addresses:', error);
          setAddressesDesti([]);
        });
    } else {
      setAddressesDesti([]);
    }
  }, 300);

  const handleSearch = () => {
    if (startAddress && destiAddress) {
      setOrigin(startAddress);
      setDestination(destiAddress);
      setSearchTrigger(!searchTrigger); // Toggle to trigger re-render
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
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Start Address" variant="outlined" />}
          />
          <Autocomplete
            disablePortal
            options={addressesDesti}
            onInputChange={(event, newInputValue) => fetchAddressesDesti(newInputValue)}
            onChange={(event, newValue) => setDestiAddress(newValue)}
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={(option) => option.toString()}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Destination Address" variant="outlined" />}
          />
                    <select value={travelMode} onChange={e => setTravelMode(google.maps.TravelMode[e.target.value])}>
            <option value="WALKING">Walking</option>
            <option value="TRANSIT">Public Transit</option>
          </select>
          <button onClick={handleSearch}>Enter</button>
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <Map
          style={{ width: '100%', height: '100%' }}
          geoJsonUrl="footpath-steepness.geojson"
          origin={origin}
          destination={destination}
          travelMode={travelMode}
          searchTrigger={searchTrigger}
        />
        
      </div>
      <div>
      <h1>Dashboard</h1>
      <AspectRatio ratio={16 / 9} className="w-full mt-4">
        <iframe
          src="https://public.tableau.com/views/AccessibleWashroomsAnalysis/NearestWashrooms?:language=en-US&:display_count=n&:origin=viz_share_link"
          frameBorder="0"
          className="h-full w-full overflow-hidden rounded-lg border bg-muted"
          
        />
      </AspectRatio>
    </div>
      <Box mt={30}><Footer /></Box>

    </div>
  );
};

export default Home;

"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from 'lodash';
import SearchBar from '../../components/main/homesearch'; // Adjust path to fit your file structure
import Footer from '../../components/main/Footer';

const Home = () => {
  const [startAddress, setStartAddress] = useState('');
  const [destiAddress, setDestiAddress] = useState('');
  const [addressesStart, setAddressesStart] = useState([]);
  const [addressesDesti, setAddressesDesti] = useState([]);

  const fetchAddressesStart = debounce((searchText) => {
    if (searchText.trim() !== "") {
      axios.get(`http://localhost:8080/addresses?search=${encodeURIComponent(searchText)}`)
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
      axios.get(`http://localhost:8080/addresses?search=${encodeURIComponent(searchText)}`)
        .then(response => setAddressesDesti(response.data || []))
        .catch(error => {
          console.error('Error fetching destination addresses:', error);
          setAddressesDesti([]);
        });
    } else {
      setAddressesDesti([]);
    }
  }, 300);

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
          <button onClick={() => console.log('Search Clicked')}>Enter</button>
        </div>
      </div>
      <Box mt={30}><Footer /></Box>
    </div>
  );
};

export default Home;

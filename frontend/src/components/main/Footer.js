import React from 'react';
import Link from 'next/link';
import { Box, Grid, Typography, TextField, InputAdornment,useMediaQuery, IconButton, useTheme} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { useRouter } from 'next/navigation'; 



function Footer() {
  const theme = useTheme();
  const router = useRouter();  // Use the navigate function
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const handleNavigation = (path) => () => {
    router.push(`/${path}`);  // Use navigate instead of router.push
  };

  return (
    <Box sx={{
      width: '100%',
      color: 'rgb(32, 20, 69)',
      bgcolor: 'background.paper',
      padding: 3,
      fontFamily: 'sans-serif',
      maxWidth: '1200px',
      margin: 'auto'
    }}>
    <Grid container spacing={10} justifyContent="space-between">
      <Grid item xs={4} md={4}>
        <Grid container spacing={10} justifyContent="space-between">
          <Grid item xs={6} md={6}>
            <Typography variant="h6" sx={{ lineHeight: '3' }}>Recreation</Typography>
            <Typography variant="body2" sx={{ lineHeight: '2', cursor: 'pointer' }} onClick={handleNavigation('Eaterydrink')}>Eateries</Typography>
            <Typography variant="body2" sx={{ lineHeight: '2', cursor: 'pointer' }} onClick={handleNavigation('Theatres')}>Theatres</Typography>
            <Typography variant="body2" sx={{ lineHeight: '2', cursor: 'pointer' }} onClick={handleNavigation('Recreation')}>Retail Stores</Typography>
            <Typography variant="body2" sx={{ lineHeight: '2', cursor: 'pointer' }} onClick={handleNavigation('Parks')}>Parks</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="h6" sx={{ lineHeight: '3' }}>Travel</Typography>
            <Typography variant="body2" sx={{ lineHeight: '2', cursor: 'pointer' }} onClick={handleNavigation('Travel')}>Trams</Typography>
            <Typography variant="body2" sx={{ lineHeight: '2', cursor: 'pointer' }} onClick={handleNavigation('Travel')}>Train</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4} md={4} style={{ width: isMdUp ? '350px' : '50px' }}></Grid>

        <Grid item xs={4} md={4}>
          <Typography variant="h4" gutterBottom>
            Let's keep in touch.
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Email address"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <EmailIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box mt={3}>
            <IconButton><FacebookIcon /></IconButton>
            <IconButton><InstagramIcon /></IconButton>
            <IconButton><TwitterIcon /></IconButton>
            <IconButton><PinterestIcon /></IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;

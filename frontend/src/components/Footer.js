import React from 'react';
import Link from 'next/link';
import { Box, Grid, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { useRouter } from 'next/navigation'; 



function Footer() {
  const router = useRouter();  // Use the navigate function

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
    <Grid container spacing={{ xs: 8, md: 70 }} justifyContent="space-between">
      <Grid item xs={6} md={6}>
        <Grid container spacing={10} justifyContent="space-between">
          <Grid item xs={6} md={6}>
            <Typography variant="h6" sx={{ lineHeight: '3' }}>Recreation</Typography>
            <Typography variant="body2" sx={{ lineHeight: '2', cursor: 'pointer' }} onClick={handleNavigation('eateries')}>Eateries</Typography>
            <Typography variant="body2" sx={{ lineHeight: '2', cursor: 'pointer' }} onClick={handleNavigation('theatres')}>Theatres</Typography>
            <Typography variant="body2" sx={{ lineHeight: '2', cursor: 'pointer' }} onClick={handleNavigation('retail-stores')}>Retail Stores</Typography>
            <Typography variant="body2" sx={{ lineHeight: '2', cursor: 'pointer' }} onClick={handleNavigation('parks')}>Parks</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Typography variant="h6" sx={{ lineHeight: '3' }}>Travel</Typography>
            <Typography variant="body2" sx={{ lineHeight: '2', cursor: 'pointer' }} onClick={handleNavigation('trams')}>Trams</Typography>
            <Typography variant="body2" sx={{ lineHeight: '2', cursor: 'pointer' }} onClick={handleNavigation('train')}>Train</Typography>
          </Grid>
        </Grid>
      </Grid>

        <Grid item xs={6} md={6}>
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

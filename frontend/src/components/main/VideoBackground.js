import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../../styles/globals.css';

export default function VideoBackground() {
  return (
    // 大屏幕显示
      <Box
        position="relative"
        width="100%"
        height="100vh" // Set the height to viewport height to make it full screen
        m={0}
        p={0}
        display="flex" // Use flexbox for positioning
        justifyContent="center" // Center horizontally
        alignItems="center" // Center vertically
        overflow="hidden"
      >
        <video autoPlay loop muted playsInline style={{
        objectFit: 'cover', // Cover the entire area of the box
        minWidth: '100%',  // 确保宽度总是100%
        minHeight: '100%',  // 确保最小高度是100%
        width: 'auto',  // 自动调整宽度保持比例
        height: 'auto',  // 自动调整高度保持比例
        // display: { xs: 'none', md: 'block' }, // 大屏幕显示

        }}>
          <source src="VideoBackground.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* 大屏幕显示 */}
        <Box
          position="absolute"
          p={3}
          sx={{
            color: '#fff',
            fontFamily: 'sans-serif',
            // Center the text box
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // This ensures precise centering
            display: { xs: 'none', md: 'block' } // 大屏幕显示
          }}
        >
          <Typography variant="h3" component="h1">
            Guide To Accessible Adventures And Ways To Get around Melbourne!
          </Typography>
          <Typography variant="subtitle1" my={2}>
            Explore Melbourne's Accessible Wonders And Find Perfect Ways To Explore This City With Ease 
          </Typography>
          {/* <Button variant="contained" color="primary">
            TAKE THE QUIZ
          </Button>
          <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>
            SHOP NOW
          </Button> */}
        </Box>
        {/* 小屏幕显示 */}
        <Box
          position="absolute"
          p={0}
          sx={{
            color: '#fff',
            fontFamily: 'sans-serif',
            // Center the text box
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // This ensures precise centering
            display: { xs: 'block', md: 'none' }, // 大屏幕显示
            width: { xs: 'auto', md: '100%' },
            margin: { xs: 'auto', md: 0 },
            textAlign: { xs: 'center', md: 'inherit' }
          }}
        >
          <Typography variant="h3" component="h1" sx={{ fontSize: '1.5rem'}}>
            Guide To Accessible Melbourne!
          </Typography>
          <Typography variant="subtitle1" my={2} sx={{ fontSize: '1rem'}}>
            Explore Melbourne's Accessible Wonders And Find Perfect Ways To Explore This City With Ease 
          </Typography>
          {/* <Button variant="contained" color="primary" sx={{ my: 1 }}>
            TAKE THE 
          </Button>
          <Button variant="outlined" color="secondary" sx={{ my: 1,ml: 0 }}>
            SHOP NOW
          </Button> */}
        </Box>
      </Box>

  );
}
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../../styles/globals.css';
import { useRouter } from 'next/navigation'; 


export default function VideoBackground() {
  const router = useRouter();


 
  const handleNavigation = (path) => () => {
    router.push(`/Recreation`); 
  };

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
         {/* Semi-transparent overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgcolor="rgba(0, 0, 0, 0.4)"  // Adjust opacity here
        />
        <Box
          position="absolute"
          p={3}
          sx={{
            color: '#fff',
            fontFamily: 'sans-serif',
            // Center the text box
            top: '40%',
            left: '40%',
            transform: 'translate(-50%, -50%)', // This ensures precise centering
            display: { xs: 'none', md: 'block' } // 大屏幕显示
          }}
        >
          <Typography variant="h3" component="h1"sx={{fontSize:'72px'}}>
            Live Limitless
          </Typography>
          <Typography variant="subtitle1" my={2}sx={{fontSize:'20px',mr:"100px",fontWeight:'bold'}}>
            Explore Melbourne's inclusive recreational hubs, complete with travel routes tailored to your accessibility requirements.
          </Typography>
          <Button onClick={handleNavigation('/Recreation')} variant="contained" sx={{ bgcolor: 'orange', color: 'black' }}>
            Get Started
          </Button>
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
            Live Limitless
          </Typography>
          <Typography variant="subtitle1" my={2} sx={{ fontSize: '1rem'}}>
            Explore Melbourne's inclusive recreational hubs, complete with travel routes tailored to your accessibility requirements.
          </Typography>
          <Button variant="contained" sx={{ bgcolor: 'orange', color: 'black' }} >
            Get Started
          </Button>
        </Box>
      </Box>

  );
}

// pages/index.js 或 pages/index.tsx
"use client";

import './global.css';
import React from 'react';
import SearchBar from '../components/main/homesearch'; // 调整路径以符合您的文件结构
import VideoBackground from '../components/main/VideoBackground';
import HomeContent from '../components/main/HomeContent';
import Footer from '../components/main/Footer';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../styles/them';


import Box from '@mui/material/Box';

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
    <div>
      <Box mb={2}> {/* mb是margin-bottom的缩写 */}
        <SearchBar />
      </Box >
      <VideoBackground />
      <Box sx={{color:"primary"}} mt={10}  >
      <HomeContent />
      </Box>
      <Box 
        sx={{
          height: '2px', // or '1px' for a thin line
          bgcolor: '#F6F4EF', // use any color from the theme or a custom color
          width: '100%', // ensures the line stretches across the screen
        }}
      />
      <Box >
      <Footer  />
      </Box>
      {/* 这里是主页的其他内容 */}
    </div>
    </ThemeProvider>
  );
}

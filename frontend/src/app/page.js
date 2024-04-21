// pages/index.js 或 pages/index.tsx
"use client";

import '../styles/globals.css';
import React from 'react';
import SearchBar from '../components/main/homesearch'; // 调整路径以符合您的文件结构
import VideoBackground from '../components/main/VideoBackground';
import HomeContent from '../components/main/HomeContent';
import Footer from '../components/main/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';  // 用于应用基础 CSS 样式


import Box from '@mui/material/Box';
const theme = createTheme({
  palette: {
    text: {
      primary: 'rgb(32, 20, 69)',
      secondary: 'rgb(32, 20, 69)'
    }
  }
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
    <div>
      <Box mb={2}> {/* mb是margin-bottom的缩写 */}
        <SearchBar />
      </Box>
      <VideoBackground />
      <Box mt={10} mb={10}>
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
      <Footer />
      </Box>
      {/* 这里是主页的其他内容 */}
    </div>
    </ThemeProvider>
  );
}

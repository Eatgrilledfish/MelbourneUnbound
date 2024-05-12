// pages/index.js 或 pages/index.tsx
"use client";

import '../global.css';
import React, { useState, useEffect } from 'react';
import { Fade } from '@mui/material';
import SearchBar from '../../components/main/homesearch'; // 调整路径以符合您的文件结构
import Footer from '../../components/main/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';  // 用于应用基础 CSS 样式
import Maincontent from './Maincontent';


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


    const [stage, setStage] = useState(1);
    const resetStage = () => {
        setStage(0);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
          setStage(1);
        }, 100);
        return () => clearTimeout(timer);
      }, []);

    const goToNextStage = () => {
        setStage((prevStage) => prevStage + 1);
    };
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Box mb={8}> {/* mb是margin-bottom的缩写 */}
                    <SearchBar/>
                </Box>               
                <Box mt={20}>
                    <Maincontent/>
                </Box>
                <Box >
                    <Footer />
                </Box>
                {/* 这里是主页的其他内容 */}
            </div>
        </ThemeProvider>
    );
}

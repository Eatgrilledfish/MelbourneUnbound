// pages/index.js 或 pages/index.tsx
"use client";

import '../global.css';
import React, { useState, useEffect, useRef } from 'react';
import { Fade } from '@mui/material';
import SearchBar from '../../components/main/homesearch'; // 调整路径以符合您的文件结构
import Footer from '../../components/main/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion, onAnimationComplete } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CssBaseline from '@mui/material/CssBaseline';  // 用于应用基础 CSS 样式
import FirstComponent from './FirstComponent';
import SecondComponent from './SecondComponent';
import Box from '@mui/material/Box';
const theme = createTheme({
    palette: {
        text: {
            primary: 'rgb(32, 20, 69)',
            secondary: 'rgb(32, 20, 69)'
        }
    }
});

const scrollToSecondComponent = () => {
    const secondComponent = document.getElementById('secondComponent');
    if (secondComponent) {
        const yOffset = -100; // 这里可以调整为需要的偏移量，例如标题栏的高度
        const y = secondComponent.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
    }
};
  
export default function Home() {
    const [opacity, setOpacity] = useState(1);
    const [isVisible, setIsVisible] = useState(true);
    const firstComponentRef = useRef(null);
    const { ref, inView } = useInView({
        threshold: 0.5, // SecondComponent 至少一半进入视口时触发
        triggerOnce: true
    });
    useEffect(() => {
        const maxScrollValue = firstComponentRef.current ? firstComponentRef.current.offsetHeight : 0; // 获取 FirstComponent 的高度
        const handleScroll = () => {
            const scrollY = window.scrollY; // Current scroll position
            const newOpacity = 1 - scrollY / maxScrollValue;
            setOpacity(newOpacity < 0 ? 0 : newOpacity);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [firstComponentRef.current]); // 依赖项中包括 FirstComponent 的引用

    useEffect(() => {
        if (inView) {
            setIsVisible(false); // 当 SecondComponent 进入视口时，设置 FirstComponent 为不可见
        }
    }, [inView]);


    // useEffect(() => {
    //     setFirstComponentInView(!inView);
    //   }, [inView]);

    // const fadeInVariants = {
    //     initial: { opacity: 0 },
    //     animate: { opacity: 1 },
    //     exit: { opacity: 0 }
    // };

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Box mb={8}> {/* mb是margin-bottom的缩写 */}
                    <SearchBar />
                </Box>
                {isVisible && (
                <motion.div
                    ref={firstComponentRef}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: opacity }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <FirstComponent onProceed={scrollToSecondComponent} />
                </motion.div>
            )}
            <Box ref={ref} id="secondComponent">
                <SecondComponent />
            </Box>
                <Box mt={10} mb={10}>

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

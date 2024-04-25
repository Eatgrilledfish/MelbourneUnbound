// pages/index.js 或 pages/index.tsx
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Card, Container, CardContent, useTheme, CardActionArea, CardMedia, Typography, Button, useMediaQuery } from '@mui/material';
import '../../styles/globals.css';
import BarChart from './BarChart'
import PieChart from './PieChart'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation'; 



export default function Home() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [ref6, inView6] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.6 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.6 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.6 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 1 });
  const [ref5, inView5] = useInView({ triggerOnce: true, threshold: 1 });

  const router = useRouter();

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 50, // Increase initial downward displacement for a more dramatic entrance
      scale: 0.9 // Start slightly scaled down
    },
    animate: {
      opacity: 1, 
      y: 0,
      scale: 1, // Scale back to normal size
      transition: { 
        duration: 1.5, 
        ease: 'easeInOut', // Smooth easing for in and out
        delayChildren: 0.3, // Delay the start of child animations
        staggerChildren: 0.2 // Stagger the animation of individual cards
      }
    }
  };
  
  // 假设这些是您的数据
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const features = [
    {
      title: 'Lookup local eateries, theatres, parks and more that meet your needs',
      description: 'EXPLORE ACCESSIBLE HANGOUTS',
      imageUrl: '/spots.png',
      action: 'explore',
      path: 'Recreation',
      buttonText: 'SEARCH NOW'
    },
    {
      title: 'Save time and plan ahead for your journey within the CBD',
      description: 'PLAN YOUR ROUTES',
      imageUrl: '/travel.png',
      action: 'navigate',
      path: 'Travel',
      buttonText: 'NAVIGATE'
    },
   
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 0, overflow: 'auto' }}> {/* 调整了内边距 */}
      {/* Heading and orange line */}
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h4" component="h2" >
          OUR SERVICES
        </Typography>
        <Box sx={{ width: '200px', height: '4px', bgcolor: 'orange', margin: '8px auto 0' ,mt:3}} />
      </Box>

      <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: '1000px', margin: 'auto',mt:7 }}> {/* 调整了间距 */}
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index} >
            <motion.div
              ref={ref}
              variants={cardVariants}   // Use the predefined variants
              initial="initial"
              animate={inView ? "animate" : "initial"}  // Use the animate variant if inView
              transition="transition"  // Use the transition defined in cardVariants
            >
            <Card elevation={0} sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', mb: 4 }}>
              <CardActionArea onClick={() => router.push(feature.path)}>
                <CardMedia
                  component="img"
                  height="400"
                  image={feature.imageUrl}
                  alt={feature.title}
                  sx={{ borderRadius: 4 }}
                />
              </CardActionArea>
              <CardContent sx={{ flexGrow: 1,paddingLeft: '1px', textAlign: 'center' }}>
                <Typography variant="body1" sx={{ fontWeight: 580, mb: 2 }}>
                  {feature.description}
                </Typography>
                <Typography variant="caption" component="div" sx={{ fontSize: '0.8rem', marginBottom: 2 }}>
                  {feature.title}
                </Typography>
                {/* Orange button */}
                <Box sx={{ display: 'flex', justifyContent: 'center',p: 2, width: '100%' }}> 
                  <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ backgroundColor: 'orange', color: 'black', width: '50%' }}
                    onClick={() => router.push(feature.path)}
                  >
                    {feature.buttonText}
                  </Button>
                  
                </Box>
              </CardContent>
            </Card>
            </motion.div>
            {/* 小屏幕 */}
            <motion.div
              ref={ref6}
              variants={cardVariants}   // Use the predefined variants
              initial="initial"
              animate={inView6 ? "animate" : "initial"}  // Use the animate variant if inView
              transition="transition"  // Use the transition defined in cardVariants
            >
            <Card elevation={0} sx={{ display: { xs: 'column', md: 'none' }, flexDirection: 'column', mb: 2 }}>
              <CardActionArea onClick={() => router.push(feature.path)}>
                <CardMedia component="img" height="150" image={feature.imageUrl} alt={feature.title} sx={{ borderRadius: 2 }} />
              </CardActionArea>
              <CardContent>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                  {feature.description}
                </Typography>
                <Typography variant="caption" sx={{ mb: 2 }}>
                  {feature.title}
                </Typography>
                <Button variant="contained" color="primary" sx={{ backgroundColor: 'orange', color: 'white' }}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
            </motion.div>
          </Grid>
          
        ))}

      </Grid>
      

      {/* 绿色图片和文字 */}
      <Grid item xs={12} container spacing={3} > {/* 使用容器型Grid项 */}
        <Grid item xs={6} md={6} component="section"
          sx={{
            display: { xs: 'block', md: 'block' },
            py: 5,
            backgroundColor: 'rgba(95,190,122,255)',
            textAlign: 'left',
            px: 0,
            color: 'rgb(32, 20, 69)',
            pl: 40,
            mx: 0, // Ensure there are no horizontal margins
            width: '100%', // Fill the width of the parent without creating overflow
          }} >
          <motion.img
            src="/weseeyou.jpeg" // Replace with your image path
            alt="An image description"
            width={380}  // Adjust as necessary
            height={355} // Adjust as necessary
            ref={ref1}
            variants={fadeInVariants}
            initial="hidden"
            animate={inView1 ? "visible" : "hidden"}
            transition={{ duration: 1.5 }}
          />
        </Grid>
       
        <Grid item xs={6} md={6} component="section"
          sx={{
            display: { xs: 'block', md: 'block' },
            py: 5,
            backgroundColor: 'rgba(95,190,122,255)',
            textAlign: 'left',
            px: 0,
            color: 'rgb(32, 20, 69)',
            pl: 15,
            mx: 0, // Ensure there are no horizontal margins
            width: '100%', // Fill the width of the parent without creating overflow
          }} >
          <Box ref={ref1} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView1 ? "visible" : "hidden"}
              transition={{ duration: 1.5 }}
            >
              <Typography variant="h4"sx={{fontWeight:'bold'}} gutterBottom>
                136K
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView1 ? "visible" : "hidden"}
              transition={{ duration: 1.5, delay: 0.4 }}
            >
              <Typography variant="subtitle1" sx={{ mb: 5 ,fontStyle:'italic'}} gutterBottom>
                CBD Dwellers
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView1 ? "visible" : "hidden"}
              transition={{ duration: 1.5, delay: 0.6 }}
            >
              <Typography variant="h4" sx={{fontWeight:'bold'}}gutterBottom>
                35%
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView1 ? "visible" : "hidden"}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              <Typography variant="subtitle1" sx={{ fontStyle:'italic'}}gutterBottom>
                Need Physical Assistance
              </Typography>
            </motion.div>
          </Box>
        </Grid>
      </Grid>

      {/* we hear you*/}
      <Grid container spacing={3}sx={{mt:10}}>
        {/* Left image with increased space */}
        

        {/* Central container for colored boxes, shifted right */}
        <Grid item xs={12} md={7} sx={{ position: 'relative', height: '500px', py: 5, display: 'flex', alignItems: 'center', justifyContent: 'flex-end',ml:10 }}>
          {/* Green Box with Image */}
          <Box sx={{
            width: '35%',
            height: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: '30%',
            position: 'relative',
          }}>
            <img src="/green box.png" alt="Green Box" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute' }} />
            <Typography variant="h6" sx={{ color: 'black', textAlign: 'center', position: 'relative', zIndex: 1,pl: 5, pr: 3 }}>
              .. rely on the kindness of strangers to tell me if this is the bus I want or not
            </Typography>
          </Box>

          {/* Grey Box with Image */}
          <Box sx={{
            width: '35%',
            height: '70%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            top: '20%',
          }}>
            <img src="/grey box.png" alt="Grey Box" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute' }} />
            <Typography variant="h6" sx={{ color: 'black', textAlign: 'center', position: 'relative', zIndex: 1,pl: 4, pr: 4 }}>
              One day I'd love to not have to think about accessibility
            </Typography>
          </Box>

          {/* Orange Box with Image */}
          <Box sx={{
            width: '35%',
            height: '85%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: '15%',
            position: 'relative',
          }}>
            <img src="/orange box.png" alt="Orange Box" style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute' }} />
            <Typography variant="h6" sx={{ color: 'black', textAlign: 'center', position: 'relative', zIndex: 1,pl: 4, pr: 5 }}>
              I spend a lot of my time looking down … which is not the best way to see a city,
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ 
          display: 'flex',       // Enable flexbox
          flexDirection: 'column', // Stack children vertically
          ml: 5,
          py: 5 }}> 
          <Typography variant="h2" sx={{ color: 'black', textAlign: 'left', position: 'relative' ,mb:5,fontStyle:'italic'}}>
            W E
          </Typography>
          <Typography variant="h2" sx={{ color: 'black', textAlign: 'left', position: 'relative' ,mb:5,fontStyle:'italic'}}>
            H  E  A  R
          </Typography>
          <Typography variant="h2" sx={{ color: 'black', textAlign: 'left', position: 'relative' ,fontStyle:'italic'}}>
            Y  O  U
          </Typography>

        </Grid>
      </Grid>



      {/* we fell you图片和文字 */}
      <Grid item xs={12} container spacing={3} sx={{mt:9}} > {/* 使用容器型Grid项 */}

        <Grid item xs={6} md={6} component="section" sx={{
          display: { xs: 'block', md: 'block' },
          py: 5,
          textAlign: 'center',
          px: 0,
          color: 'white',
          pl: 28,
          width: '100%', // Fill the width of the parent without creating overflow
          backgroundColor: 'black' // Set background color to black
        }} >
          <Box ref={ref3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <Typography variant="h4" component="h1" sx={{ color: 'white' , fontSize:'4rem',fontFamily:'Orbitron'}}>
              We Feel You
            </Typography>   
          </Box>
        </Grid>
        <Grid item xs={6} md={6} component="section"
          sx={{
            display: { xs: 'block', md: 'block' },
            py: 10,
            textAlign: 'left',
            px: 0,
            pl: 15,
            backgroundColor: 'black',
            mx: 0, // Ensure there are no horizontal margins
            width: '100%', // Fill the width of the parent without creating overflow
          }} >
          <motion.img
            src="/wefellyou1.jpeg" // Replace with your image path
            alt="An image description"
            width={600}  // Adjust as necessary
            height={250} // Adjust as necessary
            ref={ref3}
            variants={fadeInVariants}
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
            transition={{ duration: 1.5,delay: 0.4 }}
          />
        </Grid>
      </Grid>



      {/* 中间分隔栏 */}
      {/* 大屏幕显示 */}
      <Box>
      <Grid
        component="section"
        sx={{
          display: { xs: 'none', md: 'block' },
          py: 5,
          backgroundColor: '#F6F4EF',
          textAlign: 'left',
          px: 0,
          color: 'rgb(32, 20, 69)',
          pl: 28,
          mx: 0, // Ensure there are no horizontal margins
          width: '100%', // Fill the width of the parent without creating overflow
        }}
      >
        <Typography variant="h5" gutterBottom >
          Charting Accessibility
        </Typography>
        <Typography variant="h5">
          <b>See the Breakdown of Wheelchair-Friendly in Melbourne's CBD</b>
        </Typography>
      </Grid>
      {/* 小屏幕显示 */}
      <Grid
        component="section"
        sx={{
          display: { xs: 'block', md: 'none' },
          py: 5,
          backgroundColor: '#F6F4EF',
          textAlign: 'left',
          px: 0,
          color: 'rgb(32, 20, 69)',
          pl: 0,
          mx: 0, // Ensure there are no horizontal margins
          width: '100%', // Fill the width of the parent without creating overflow
        }}
      >
        <Typography variant="h6" gutterBottom >
          Charting Accessibility
        </Typography>
        <Typography variant="h6">
          <b>See the Breakdown of Wheelchair-Friendly in Melbourne's CBD</b>
        </Typography>
      </Grid>
      </Box>
      {/* 下方的文本 */}
      <Grid item xs={12} container spacing={3} sx={{ maxWidth: '1000px', margin: 'auto' }}> {/* 使用容器型Grid项 */}
      {/* background: '#7ce0d8' */}
        <Grid item xs={12} md={6} sx={{ textAlign: 'center', color: 'rgb(32, 20, 69)', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex',}}>
          {/* 文本内容 */}
          <motion.div
          initial={{ x: '-20vw', opacity: 0 }}  // 初始状态，从右侧200px的地方开始，不可见
          animate={inView4 ? { x: 0, opacity: 1 } : {}}   // 动画结束状态，移动到原位置并变为可见
          transition={{ duration: 1.5, type: 'spring', stiffness: 50 }}  // 使用spring动画，弹性系数100
        >
          <Typography variant="h8">
            Explore the distribution of restaurants based on their accessibility ratings in the CBD. This bar chart illustrates the number of restaurants falling into different accessibility categories
          </Typography>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6} >
          {/* 图片内容 */}
          <div ref={ref4}>
            {inView4 ? <BarChart /> : <div>Loading...</div>}
          </div>
        </Grid>
      </Grid>
      {/* 饼图区域 */}
      <Grid item xs={12} container spacing={10} sx={{ maxWidth: '1000px', margin: 'auto' }}> {/* 使用容器型Grid项 */}
      <Grid item xs={12} md={6}  >
          {/* 图片内容 */}
          <div ref={ref5}>
            {inView5 ? <PieChart /> : <div>Loading...</div>}
          </div>
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: 'center', color: 'rgb(32, 20, 69)', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex', }}>
          {/* 文本内容 */}
          <motion.div
          initial={{ x: '100vw', opacity: 0 }}  // 初始状态，从右侧200px的地方开始，不可见
          animate={inView5 ? { x: 0, opacity: 1 } : {}}   // 动画结束状态，移动到原位置并变为可见
          transition={{ duration: 1.5, type: 'spring', stiffness: 50 }}  // 使用spring动画，弹性系数100
        >
          <Typography variant="h8"> {/* variant应为h6等有效值，h8不是有效值 */}
            Ride the Wave: Visualizing Accessible Transport Trends in Melbourne's CBD!
          </Typography>
        </motion.div>
        </Grid>
      </Grid>
      {/* 最后一行 */}
      <Box pt={10} pb={10} display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="30vh" sx={{backgroundColor:'#F6F4EF'}}> {/* 调整height根据需要 */}
      <img
        src="/misson.png"
        alt="mission"
        width={280}
        height={50}
      />
      <Typography variant='h6' sx={{color: 'rgb(32, 20, 69)', mt:10, pl:20,pr:20,textAlign: 'center'}}>
        We are dedicated to empowering wheelchair users in Melbourne, championing accessibility throughout city life, and fostering inclusivity and independence for all.
      </Typography>
      </Box>
    </Box>
    
  );
}

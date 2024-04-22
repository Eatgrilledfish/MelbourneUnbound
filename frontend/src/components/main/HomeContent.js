// pages/index.js 或 pages/index.tsx
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Card, Container, CardContent, useTheme, CardActionArea, CardMedia, Typography, Button, useMediaQuery } from '@mui/material';
import '../../styles/globals.css';
import BarChart from './Barchart'
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
      title: 'Find Different Types Of Accessible Spots',
      description: 'EXPLORE ACCESSIBLE SPOTS',
      imageUrl: '/spots.png',
      action: 'explore',
      path: 'Recreation'
    },
    {
      title: 'Find Different Modes Of Transport That Are Accessible',
      description: 'NAVIGATE',
      imageUrl: '/travel.png',
      action: 'navigate',
      path: 'Travel'
    },
    {
      title: 'Select A Location And We Help You Navigate',
      description: 'PLAN IT OUT',
      imageUrl: '/route.png',
      action: 'plan',
      path: 'Planning'
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 0, overflow: 'auto' }}> {/* 调整了内边距 */}
      <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: '1000px', margin: 'auto' }}> {/* 调整了间距 */}
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index} >
            <motion.div
              ref={ref}
              variants={cardVariants}   // Use the predefined variants
              initial="initial"
              animate={inView ? "animate" : "initial"}  // Use the animate variant if inView
              transition="transition"  // Use the transition defined in cardVariants
            >
            <Card elevation={0} sx={{ display: 'flex', flexDirection: 'column', display: { xs: 'none', md: 'block' } }}> {/* 始终使用列布局 */}
              <CardActionArea onClick={() => router.push(feature.path)}>
                <CardMedia
                  component="img"
                  height="400" // 调整高度
                  image={feature.imageUrl}
                  alt={feature.title}
                  sx={{ borderRadius: 4 }}
                />
              </CardActionArea>
              <CardContent sx={{ paddingLeft: '1px' }}>
                <CardActionArea onClick={() => router.push(feature.path)}>
                  <Typography variant="body1" sx={{ fontWeight: 580 }} >
                    {feature.description}
                  </Typography>
                </CardActionArea>
                <Typography gutterBottom variant="caption" component="div" sx={{ fontSize: '0.8rem', marginTop: 1 }}>
                  {feature.title}
                </Typography>
              </CardContent>

              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>

              </Box>
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
            <Card elevation={0} sx={{ display: 'flex', flexDirection: 'column', display: { xs: 'column', md: 'none' } }}> {/* 始终使用列布局 */}
              <CardActionArea onClick={() => router.push(feature.path)}>
                <CardMedia
                  component="img"
                  height="150" // 调整高度
                  image={feature.imageUrl}
                  alt={feature.title}
                  sx={{ borderRadius: 4 }}
                />
              </CardActionArea>
              <CardContent sx={{ paddingLeft: '1px' }}>
                <CardActionArea onClick={() => router.push(feature.path)}>
                  <Typography variant="body1" sx={{ fontWeight: 580 }} >
                    {feature.description}
                  </Typography>
                </CardActionArea>
                <Typography gutterBottom variant="caption" component="div" sx={{ fontSize: '0.8rem', marginTop: 1 }}>
                  {feature.title}
                </Typography>
              </CardContent>

              {/* <Button size="small" color="primary" variant="contained">
                {feature.description}
                </Button> */}

              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>

              </Box>
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
            pl: 28,
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
            pl: 28,
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
              <Typography variant="h4" gutterBottom>
                136,000
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView1 ? "visible" : "hidden"}
              transition={{ duration: 1.5, delay: 0.4 }}
            >
              <Typography variant="subtitle1" sx={{ mb: 5 }} gutterBottom>
                City Dwellers
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView1 ? "visible" : "hidden"}
              transition={{ duration: 1.5, delay: 0.6 }}
            >
              <Typography variant="h4" gutterBottom>
                35%
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView1 ? "visible" : "hidden"}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Needing Physical Attention
              </Typography>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
      {/* 白色图片和文字 */}
      <Grid item xs={12} container spacing={3} > {/* 使用容器型Grid项 */}

        <Grid item xs={6} md={6} component="section" sx={{
          display: { xs: 'block', md: 'block' },
          py: 5,
          textAlign: 'center',
          px: 0,
          color: 'rgb(32, 20, 69)',
          pl: 28,
          mx: 0, // Ensure there are no horizontal margins
          width: '100%', // Fill the width of the parent without creating overflow
        }} >
          <Box ref={ref2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView2 ? "visible" : "hidden"}
              transition={{ duration: 1.5 }}
            >
              <Typography variant="h5" sx={{ mb: 5 }} gutterBottom>
                “I spend a lot of my time looking down … which is not the best way to see a city,”
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView2 ? "visible" : "hidden"}
              transition={{ duration: 1.5, delay: 0.4 }}
            >
              <Typography variant="h5" sx={{ mb: 5 }} gutterBottom>
                "One day I'd love to not have to think about accessibility"
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView2 ? "visible" : "hidden"}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              <Typography variant="h5" gutterBottom>
                ".. Rely on the kindness of strangers to tell me if this is the bus I want or not"
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView2 ? "visible" : "hidden"}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
            </motion.div>
          </Box>
        </Grid>
        <Grid item xs={6} md={6} component="section"
          sx={{
            display: { xs: 'block', md: 'block' },
            py: 20,
            textAlign: 'left',
            px: 0,
            pl: 15,
            mx: 0, // Ensure there are no horizontal margins
            width: '100%', // Fill the width of the parent without creating overflow
          }} >
          <motion.img
            src="/wehearyou.png" // Replace with your image path
            alt="An image description"
            width={480}  // Adjust as necessary
            height={155} // Adjust as necessary
            ref={ref2}
            variants={fadeInVariants}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            transition={{ duration: 1.5 }}
          />
        </Grid>
      </Grid>
      {/* we fell you图片和文字 */}
      <Grid item xs={12} container spacing={3} > {/* 使用容器型Grid项 */}

        <Grid item xs={6} md={6} component="section" sx={{
          display: { xs: 'block', md: 'block' },
          py: 5,
          textAlign: 'center',
          px: 0,
          color: 'rgb(32, 20, 69)',
          pl: 28,
          mx: 0, // Ensure there are no horizontal margins
          width: '100%', // Fill the width of the parent without creating overflow
        }} >
          <Box ref={ref3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <motion.img
            src="/wefellyouword.png" // Replace with your image path
            alt="An image description"
            width={520}  // Adjust as necessary
            height={60} // Adjust as necessary
            ref={ref3}
            variants={fadeInVariants}
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
            transition={{ duration: 1.5,delay: 0.2 }}
          />
          </Box>
        </Grid>
        <Grid item xs={6} md={6} component="section"
          sx={{
            display: { xs: 'block', md: 'block' },
            py: 10,
            textAlign: 'left',
            px: 0,
            pl: 15,
            mx: 0, // Ensure there are no horizontal margins
            width: '100%', // Fill the width of the parent without creating overflow
          }} >
          <motion.img
            src="/wefellyou1.jpeg" // Replace with your image path
            alt="An image description"
            width={480}  // Adjust as necessary
            height={205} // Adjust as necessary
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
        <Grid item xs={12} md={6} sx={{ textAlign: 'center', color: 'rgb(32, 20, 69)', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex', }}>
          {/* 文本内容 */}
          <motion.div
          initial={{ x: '-100vw', opacity: 0 }}  // 初始状态，从右侧200px的地方开始，不可见
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
    <Typography variant='h6' sx={{color: 'rgb(32, 20, 69)', mt:10}}>
    Empowering Melbourne's disabled community by championing accessibility across city life, fostering inclusivity and independence for all residents.
    </Typography>
    </Box>
    </Box>
    
  );
}

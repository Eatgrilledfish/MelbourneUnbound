// pages/index.js 或 pages/index.tsx
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Card, Container, CardContent, useTheme, CardActionArea, CardMedia, Typography, Button, useMediaQuery } from '@mui/material';
import '../../app/global.css';
import BarChart from './BarChart'
import PieChart from './PieChart'
import { motion, px } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import { orange } from '@mui/material/colors';



export default function Home() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [ref6, inView6] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.6 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.6 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.6 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.6 });
  const [ref5, inView5] = useInView({ triggerOnce: true, threshold: 0.6 });
  const [ref7, inView7] = useInView({ triggerOnce: true, threshold: 0.6 });
  const [ref8, inView8] = useInView({ triggerOnce: true, threshold: 0.6 });
  const [ref9, inView9] = useInView({ triggerOnce: true, threshold: 0.6 });

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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 1.5,
        ease: 'easeInOut'
      }
    }
  };

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

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
        <Box sx={{ width: '200px', height: '4px', bgcolor: 'orange', margin: '8px auto 0', mt: 3 }} />
      </Box>

      <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: '1000px', margin: 'auto', mt: 7 }}> {/* 调整了间距 */}
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
                <CardContent sx={{ flexGrow: 1, paddingLeft: '1px', textAlign: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: 580, mb: 2 }}>
                    {feature.description}
                  </Typography>
                  <Typography variant="caption" component="div" sx={{ fontSize: '0.8rem', marginBottom: 2 }}>
                    {feature.title}
                  </Typography>
                  {/* Orange button */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, width: '100%' }}>
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
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, width: '100%' }}>
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
          </Grid>

        ))}

      </Grid>


      {/* 绿色图片和文字 */}
      <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            py: 5,
            backgroundColor: 'rgba(95,190,122,255)',
            textAlign: 'left',
            px: 0,
            color: 'rgb(32, 20, 69)',
            
            mx: 0, // Ensure there are no horizontal margins
            width: '100%', // Fill the width of the parent without creating overflow
          }} >
                <Box
      sx={{
        width: { xs: '100%', md: '380px' },
        height: { xs: 'auto', md: '355px' },
        display: { xs: 'none', md: 'flex' },
        ml:'400px'
      }}>
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
          </Box>
 {/* 文本 */}
          <Box ref={ref1} sx={{ ml: { xs:6, md: 16, lg: 30 }, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'center', height: '100%', mt: '70px',flex: 1 }}>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView1 ? "visible" : "hidden"}
              transition={{ duration: 1.5 }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
                136K
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView1 ? "visible" : "hidden"}
              transition={{ duration: 1.5, delay: 0.4 }}
            >
              <Typography variant="subtitle1" sx={{ mb: 5, fontStyle: 'italic' }} gutterBottom>
                CBD Dwellers
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView1 ? "visible" : "hidden"}
              transition={{ duration: 1.5, delay: 0.6 }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
                35%
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView1 ? "visible" : "hidden"}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }} gutterBottom>
                Need Physical Assistance
              </Typography>
            </motion.div>
            </Box>
          </Box>
      {/* small screen*/}
      <Box sx={{
              display: { xs: 'flex', md: 'none' },
              py: 5,
              backgroundColor: 'rgba(95,190,122,255)',
              textAlign: 'center',
              px: 0,
              color: 'rgb(32, 20, 69)',
              
              mx: 0, // Ensure there are no horizontal margins
              width: '100%', // Fill the width of the parent without creating overflow
            }}
         >
          <Box
            sx={{
              width: { xs: 'auto' },
              height: { xs: 'auto' },
              display: { xs: 'flex', md: 'none' },
              
            }}>
                <motion.img
                  src="/weseeyou.jpeg" // Replace with your image path
                  alt="An image description"
                  width={200}  // Adjust as necessary
                  height={200} // Adjust as necessary
                  
                  ref={ref7}
                  variants={fadeInVariants}
                  initial="hidden"
                  animate={inView7 ? "visible" : "hidden"}
                  transition={{ duration: 1.5 }}
                />
          </Box>
          <Box ref={ref7} sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', justifyContent: 'center', height: '100%',flex: 1 }}>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView7 ? "visible" : "hidden"}
              transition={{ duration: 1.5 }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
                136K
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView7 ? "visible" : "hidden"}
              transition={{ duration: 1.5, delay: 0.4 }}
            >
              <Typography variant="subtitle1" sx={{ mb: 5, fontStyle: 'italic' }} gutterBottom>
                CBD Dwellers
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView7 ? "visible" : "hidden"}
              transition={{ duration: 1.5, delay: 0.6 }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
                35%
              </Typography>
            </motion.div>
            <motion.div
              variants={fadeInVariants}
              initial="hidden"
              animate={inView7 ? "visible" : "hidden"}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              <Typography variant="subtitle1" sx={{ fontStyle: 'italic' }} gutterBottom>
                Need Physical Assistance
              </Typography>
            </motion.div>
            
          </Box>
      </Box>

      {/* we hear you*/}
      <Grid container spacing={3} sx={{ mt: 10, }}>
        {/* Left image with increased space */}


        {/* Central container for colored boxes, shifted right */}
        <Grid item xs={12} md={7} sx={{ position: 'relative', height: '500px', py: 5, display: {xs:'none',md:'flex'}, alignItems: 'center', justifyContent: 'flex-end', ml: 10 }}>
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
            <motion.img
              ref={ref3}
              src="/green box.png"
              alt="Green Box"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView3 ? 1 : 0 }}  // Animation triggers based on inView
              transition={{ duration: 1 }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                position: 'absolute'
              }}
            />
            <Typography variant="h6" sx={{ color: 'black', textAlign: 'center', position: 'relative', zIndex: 1, pl: 5, pr: 3 ,fontSize: {
                xs: '0.75rem',   // 小屏幕，字体更小
                sm: '0.875rem',  // 中等屏幕，稍大一些
                md: '1rem',      // 大屏幕，正常h6大小
                lg: '1.125rem',  // 更大屏幕，字体更大
                xl: '1.25rem'    // 最大屏幕，字体最大
              }}}>
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
            <motion.img
              ref={ref4}
              src="/grey box.png"
              alt="Grey Box"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView4 ? 1 : 0 }}  // Animation triggers based on inView
              transition={{ duration: 1 }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                position: 'absolute'
              }}
            />
            <Typography variant="h6" sx={{ color: 'black', textAlign: 'center', position: 'relative', zIndex: 1, pl: 4, pr: 4 }}>
              One day I'd love to not have to think about accessibility
            </Typography>
          </Box>

          {/* Orange Box with Image */}
          <Box sx={{
            width: '40%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: '15%',
            position: 'relative',
          }}>
            <motion.img
              ref={ref5}
              src="/orange box.png"
              alt="Orange Box"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView5 ? 1 : 0 }}  // Animation triggers based on inView
              transition={{ duration: 1 }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                position: 'absolute'
              }}
            />
            <Typography variant="h6" sx={{ color: 'black', textAlign: 'center', position: 'relative', zIndex: 1, pl: 6, pr: 7 }}>
              I spend a lot of my time looking down … which is not the best way to see a city,
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{
          display: {xs:'none',md:'flex'},       // Enable flexbox
          flexDirection: 'column', // Stack children vertically
          ml: 5,
          py: 5
        }}>
          <Typography variant="h2" sx={{ color: 'black', textAlign: 'left', position: 'relative', mb: 5, fontStyle: 'italic' }}>
            W E
          </Typography>
          <Typography variant="h2" sx={{ color: 'black', textAlign: 'left', position: 'relative', mb: 5, fontStyle: 'italic' }}>
            H  E  A  R
          </Typography>
          <Typography variant="h2" sx={{ color: 'black', textAlign: 'left', position: 'relative', fontStyle: 'italic' }}>
            Y  O  U
          </Typography>

        </Grid>
      </Grid>
      {/* we hear you:small screen */}
      <Grid container spacing={1} sx={{ mt: 5 }}>
        <Grid item xs={12}  sx={{
            display: { xs: 'flex', md: 'none' }, // Always display
            flexDirection: 'column',
            alignItems: 'center'
      
          }}>
            <Typography variant="h4" sx={{ color: 'black', textAlign: 'left', position: 'relative', fontStyle: 'italic' }}>WE HEAR YOU</Typography>
          
        </Grid>
        {/* Left image placeholder for small screens */}
        <Grid item xs={12} sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center',mt:7}}>
          {/* Placeholder for potentially a slider or single image */}
        </Grid>

        {/* Responsive Central container for colored boxes */}
        <Grid item xs={12} sx={{ flexDirection: 'column',position: 'relative',  display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-end' } }}>
          {/* Green Box with Image */}
          <Box sx={{
            width: '90%', // Adjusted width for small screen
            height: '300px', // Adjusted height for small screen
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            
            position: 'relative',
            mb: 3 // Margin bottom for spacing between boxes  
          }}>
            <motion.img
              ref={ref8}
              src="/green box.png"
              alt="Green Box"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView8 ? 1 : 0 }}
              transition={{ duration: 1 }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                position: 'absolute'
              }}
            />
            <Typography variant="h6" sx={{ color: 'black', textAlign: 'center',alignItems: 'center',justifyContent:'center', position: 'relative', zIndex: 1, pl: 15, pr: 12,fontSize: {
              xs: '0.75rem',   // 小屏幕，字体更小
            }
            }}>
              .. rely on the kindness of strangers to tell me if this is the bus I want or not
            </Typography>
          </Box>

          {/* Grey Box with Image */}
          <Box sx={{
            width: '90%', // Adjusted width for small screen
            height: '300px', // Adjusted height for small screen
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            mb: 10 // Margin bottom for spacing between boxes
          }}>
            <motion.img
              ref={ref8}
              src="/grey box.png"
              alt="Grey Box"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView8 ? 1 : 0 }}
              transition={{ duration: 1 }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                position: 'absolute'
              }}
            />
            <Typography variant="h6" sx={{ color: 'black', textAlign: 'center',alignItems: 'center',justifyContent:'center', position: 'relative', zIndex: 1, pl: 15, pr: 12,fontSize: {
              xs: '0.75rem',   // 小屏幕，字体更小
            } }}>
              One day I'd love to not have to think about accessibility
            </Typography>
          </Box>

          {/* Orange Box with Image */}
          <Box sx={{
            width: '90%', // Adjusted width for small screen
            height: '300px', // Adjusted height for small screen
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            
            position: 'relative',
          }}>
            <motion.img
              ref={ref8}
              src="/orange box.png"
              alt="Orange Box"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView8 ? 1 : 0 }}
              transition={{ duration: 1 }}
              style={{
                width: 'auto',
                height: '400px',
                objectFit: 'contain',
                position: 'absolute'
              }}
            />
            <Typography variant="h6" sx={{ color: 'black', textAlign: 'center',alignItems: 'center',justifyContent:'center', position: 'relative', zIndex: 1, pl: 15, pr: 15,fontSize: {
              xs: '0.75rem',   // 小屏幕，字体更小
            } }}>
              I spend a lot of my time looking down … which is not the best way to see a city,
            </Typography>
          </Box>
        </Grid>

        
      </Grid>




      {/* we fell you图片和文字 */}
      <Box
        sx={{
          backgroundColor: 'black',
          textAlign: 'center',
          mt: 20,
          py: theme.spacing(15) // This adds some padding around the text. Adjust the number to increase or decrease the padding.
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontStyle: 'italic',
            // If you want a specific font, add it here and ensure it's loaded in your project
            // fontFamily: 'Your Font Family',
            '& span': {
              color: "white", // Use the secondary color from the theme or provide a custom one
            }
          }}
        >
          <span>WE FEEL YOU</span>
        </Typography>
      </Box>

      {/* Wheelchair in CBD */}

      <Box
        sx={{
          width: '100vw',
          height: 'your-desired-height', // e.g. '500px'
          overflow: 'hidden',
          display: 'flex', // 使用flex布局
          justifyContent: 'center', // 水平居中
          alignItems: 'center', // 垂直居中（如果需要）
          mt: 10,
          '& img': {
            width: { xs: '80%', sm: '90%' }, // 100% on extra small screens, 90% on small screens and up
            height: { xs: 'your-small-screen-height', sm: '1500px' }, // e.g. '300px' on extra small screens
          }
        }}
      >
        <motion.img
          src="we feel you group.png"
          alt="Full Width Image"
          ref={imageRef}
          variants={imageVariants}
          initial="hidden"
          animate={imageInView ? "visible" : "hidden"}
        />
      </Box>






      {/* Our Mission */}
      <Box sx={{ textAlign: 'center', my: 4, mt: 20, }}>
        <Typography variant="h4" component="h2">
          OUR MISSION
        </Typography>
        <Box sx={{ width: '200px', height: '4px', bgcolor: 'orange', margin: '8px auto 0', mt: 3 }} />
        <Grid container spacing={2} alignItems="center">
          {/* 对于小屏幕隐藏图片, 大屏幕显示 */}
          <Grid item xs={false} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <motion.img
              src="mission arrow.png"
              alt="Service Description"
              style={{ width: '50%', margin: '0 auto', display: 'block' }}
              ref={ref2}
              variants={fadeInVariants}
              initial="hidden"
              animate={inView2 ? "visible" : "hidden"}
              transition={{ duration: 1.5, delay: 0.4 }}
            />
          </Grid>
          {/* 文本在小屏幕上占满整个宽度, 大屏幕占剩余部分 */}
          <Grid item xs={12} md={6}>
            <motion.div ref={ref9}  variants={fadeInVariants} initial="hidden"  transition={{ duration: 1.5, delay: 0.4 }} animate={inView9 ? "visible" : "hidden"}>
            <Typography variant="h5" sx={{ textAlign: { xs: 'center' }, mt: 3, md: 5 }}>
              We are dedicated to empowering wheelchair users in Melbourne, championing accessibility throughout city life, and fostering inclusivity and independence for all.
            </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Box>




    </Box>

  );
}

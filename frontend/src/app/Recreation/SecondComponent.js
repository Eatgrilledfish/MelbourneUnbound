import React from 'react';
import { motion } from 'framer-motion';
import { Button, Box, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';


const MotionGrid = motion(Grid);

const SecondComponent = React.forwardRef((props, ref) => {
  const router = useRouter();

  const handleNavigateEateryDrink = () => {
    router.push('/Eaterydrink');
  };

  const handleNavigateRetail = () => {
    router.push('/Retail');
  };

  const handleNavigateTheatres = () => {
    router.push('/Theatres');
  };

  const handleNavigateParks = () => {
    router.push('/Parks');
  };

  const cardVariantsLeft = {
    hidden: {
      opacity: 0,
      x: "-100vw"
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
<<<<<<< HEAD
        type: "spring",
        stiffness: 80,
        damping: 25,
        duration: 1.5,
=======
        type: "tween",
        ease:"easeOut",
        duration: 3,
>>>>>>> 2cae928dd7125dcc9100e42e4bc7c8248dfecc2b
      }
    }
  };
  const cardVariantsRight = {
    hidden: {
      opacity: 0,
      x: "100vw"
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        ease:"easeOut",
        duration: 3,
      }
    }
  };
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.23, // 触发动画的视口阈值设置为三分之一
    triggerOnce: true
  });


  return (
    <Box ref={ref} sx={{ pt: 3, overflow: 'auto' }}>
      <Box sx={{ display: { xs: 'none', md: 'block' }, mt: 5 }}>
        <Typography variant="h4" style={{ fontStyle: 'italic', fontWeight: 'normal', textAlign: 'left', marginBottom: '8px', zIndex: 1, marginLeft: '350px' }}>
          Pick your poison
        </Typography>
        <Typography variant="h4" style={{ fontWeight: '800', textAlign: 'left', marginBottom: '8px', marginLeft: '350px' }}> {/* extrabold */}
          Food | Retail | Theatres | Parks
        </Typography>
        <Typography variant="h5" style={{ fontWeight: 'bold', fontStyle: 'italic', textAlign: 'left', marginBottom: '20px', marginLeft: '350px' }}> {/* smaller, bold and italic */}
          We’ve got your needs covered!
        </Typography>
        <Typography variant="h6" style={{ textAlign: 'left', marginBottom: '20px', marginLeft: '350px', paddingRight: '300px' }}>
          This weekend, choose how you want to make memories and browse through our top 10 cherry picked selections just for your needs. Select one of the categories below to get started.
        </Typography>
      </Box>

      <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 5 }}>
        <Typography variant="h4" style={{ fontStyle: 'italic', fontWeight: 'normal', textAlign: 'left', marginBottom: '8px', zIndex: 1, marginLeft: { xs: '10px', md: '350px' } }}>
          Pick your poison
        </Typography>
        <Typography variant="h4" style={{ fontWeight: '800', textAlign: 'left', marginBottom: '8px', marginLeft: { xs: '10px', md: '350px' } }}> {/* extrabold */}
          Food | Retail | Theatres | Parks
        </Typography>
        <Typography variant="h5" style={{ fontWeight: 'bold', fontStyle: 'italic', textAlign: 'left', marginBottom: '20px', marginLeft: { xs: '10px', md: '350px' } }}> {/* smaller, bold and italic */}
          We’ve got your needs covered!
        </Typography>
        <Typography variant="h6" style={{ textAlign: 'left', marginBottom: '20px', marginLeft: { xs: '10px', md: '350px' }, paddingRight: { xs: '10px', md: '300px' } }}>
          This weekend, choose how you want to make memories and browse through our top 10 cherry picked selections just for your needs. Select one of the categories below to get started.
        </Typography>
      </Box>


      <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: '1000px', margin: 'auto', width: '100%' }} ref={inViewRef}>
        <MotionGrid
          component={motion.div}
          variants={cardVariantsLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Card elevation={0} sx={{ maxWidth: 300, width: '100%', marginBottom: 2 }}> {/* Set maximum width for Cards */}
            <CardMedia
              component="img"
              height="280"
              width="100%"  // Ensure the width fills the card
              image="/eateries.jpg"
              alt="Image Description 1"
              sx={{ borderRadius: 10, objectFit: 'cover' }}
            />
            <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={handleNavigateEateryDrink} variant="outlined" sx={{ color: 'black', backgroundColor: 'orange', '&:hover': { backgroundColor: '#e65100' } }}>See Eateries</Button>
            </CardContent>
          </Card>
          <Card elevation={0} sx={{ maxWidth: 300, width: '100%' }}>
            <CardMedia
              component="img"
              height="280"
              width="100%"
              image="/retail.jpg"
              alt="Image Description 2"
              sx={{ borderRadius: 10, objectFit: 'cover' }}
            />
            <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={handleNavigateRetail} variant="outlined" sx={{ color: 'black', backgroundColor: 'orange', '&:hover': { backgroundColor: '#e65100' } }}>See Shops</Button>
            </CardContent>
          </Card>
        </MotionGrid>
        <MotionGrid
          component={motion.div}
          variants={cardVariantsRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Card elevation={0} sx={{ maxWidth: 300, width: '100%', marginBottom: 2 }}>
            <CardMedia
              component="img"
              height="280"
              width='100%'
              image="/theatres.jpg"
              alt="Image Description 3"
              sx={{ borderRadius: 10 }}
            />
            <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={handleNavigateTheatres} variant="outlined" sx={{ color: 'black', backgroundColor: 'orange', '&:hover': { backgroundColor: '#e65100' } }}>See Events</Button>
            </CardContent>
          </Card>
          <Card elevation={0} sx={{ maxWidth: 300, width: '100%', }}>
            <CardMedia
              component="img"
              height="280"
              width='100%'
              image="/parks.jpg" // Make sure this should be "grid4.jpg" if different
              alt="Image Description 4"
              sx={{ borderRadius: 10 }}
            />
            <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={handleNavigateParks} variant="outlined" sx={{ color: 'black', backgroundColor: 'orange', '&:hover': { backgroundColor: '#e65100' } }}>See Parks</Button>
            </CardContent>
          </Card>
        </MotionGrid>
      </Grid>
    </Box>
  );
});

export default SecondComponent;

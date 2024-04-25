import React from 'react';
import { motion } from 'framer-motion';
import {Button, Box, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useRouter } from 'next/navigation';


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
        type: "spring",
        duration: 1.5,
        delay: 1,
        when: "beforeChildren"
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
        type: "spring",
        duration: 1.5,
        delay: 1,
        when: "beforeChildren"
      }
    }
  };
  return (
    <Box ref={ref}>
      <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: '1000px', margin: 'auto', width: '100%' }}>
      <MotionGrid
          component={motion.div}
          variants={cardVariantsLeft}
          initial="hidden"
          animate="visible"
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Card elevation={0} sx={{ maxWidth: 300, marginBottom: 2 }}> {/* Set maximum width for Cards */}
            <CardMedia
              component="img"
              height="280"
              image="/grid1.jpg"
              alt="Image Description 1"
              sx={{ borderRadius: 4 }}
            />
            <CardContent>
              <Button onClick={handleNavigateEateryDrink} variant="outlined"sx={{ color: '#fff', backgroundColor: '#00695c', '&:hover': { backgroundColor: '#004d40' } }}>EATERY & DRINK SPORTS</Button>
            </CardContent>
          </Card>
          <Card elevation={0} sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="280"
              image="/grid2.jpg"
              alt="Image Description 2"
              sx={{ borderRadius: 4 }}
            />
            <CardContent>
             <Button variant="outlined" sx={{ color: '#fff', backgroundColor: '#00695c', '&:hover': { backgroundColor: '#004d40' } }}>WHEELCHAIR-FRIENDLY RETAIL</Button>
            </CardContent>
          </Card>
          </MotionGrid>
          <MotionGrid
          component={motion.div}
          variants={cardVariantsRight}
          initial="hidden"
          animate="visible"
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Card elevation={0} sx={{ maxWidth: 300, marginBottom: 2 }}>
            <CardMedia
              component="img"
              height="280"
              image="/grid3.jpg"
              alt="Image Description 3"
              sx={{ borderRadius: 4 }}
            />
            <CardContent>
              <Button onClick={handleNavigateTheatres} variant="outlined" sx={{ color: '#fff', backgroundColor: '#00695c', '&:hover': { backgroundColor: '#004d40' } }}>ACCESSIBLE THEEATREES</Button>
            </CardContent>
          </Card>
          <Card elevation={0} sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="280"
              image="/grid4.jpeg" // Make sure this should be "grid4.jpg" if different
              alt="Image Description 4"
              sx={{ borderRadius: 4 }}
            />
            <CardContent>
             <Button onClick={handleNavigateParks} variant="outlined" sx={{ color: '#fff', backgroundColor: '#00695c', '&:hover': { backgroundColor: '#004d40' } }}>EXPLORE NATURE IN PARKS</Button>
            </CardContent>
          </Card>
        </MotionGrid>
      </Grid>
    </Box>
  );
});

export default SecondComponent;

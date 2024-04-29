import React from 'react';
import { Box, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const MotionIconButton = motion(IconButton); // Changed to IconButton for motion effects

const FirstComponent = React.forwardRef(({ onProceed }, ref) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  const variantButton = {
    hover: {
      scale: 1.3,
      transition: {
        duration: 0.3,
        yoyo: Infinity
      },
      transformOrigin: 'center center',
      transform: 'translate(-50%, -50%)'
    } 
  };

  const fontSize = matchesSM ? '3rem' : '5rem'; // Responsive font size
  const iconSize = matchesSM ? 'default' : 'large'; // Responsive icon size
  const bottomPosition = matchesSM ? '100px' : '200px'; // Responsive icon position

  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh" // minHeight for better small screen support
      ref={ref}
      marginBottom={theme.spacing(15)}
      >
      <Box position="absolute" textAlign="center" width="100%"> {/* Set width to 100% */}
        <motion.img
          src="/rewind.jpg"
          alt="Descriptive Alt Text"
          variants={imageVariants}
          initial='hidden'
          animate="visible"
          style={{ width: '100%', height: 'auto'}} // Set width to 100%
        />
        <Typography
          variant="h2" // Use MUI variant for better responsive text
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: fontSize,
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: 'orange',
            textShadow: '10px 10px black',
            padding: theme.spacing(1) // Add padding for smaller screens
          }}
        >
          Ready to Unwind?
        </Typography>
        <MotionIconButton
          onClick={onProceed}
          variants={variantButton}
          whileHover="hover"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: bottomPosition,
            transform: 'translateX(-50%)',
            color: 'white',
          }}
        >
          <ArrowDownwardIcon fontSize={iconSize} />
        </MotionIconButton>
      </Box>
    </Box>
  );
});

export default FirstComponent;

// FirstComponent.js
import React from 'react';
import { Box, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const MotionIconButton = motion(ArrowDownwardIcon);

const FirstComponent = React.forwardRef(({ onProceed }, ref) => {
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
      }
    }
  };

  return (
    <Box
      position="relative"
      display="flex" // Use flexbox to center children
      alignItems="center" // Align items vertically in the center
      justifyContent="center" // Align items horizontally in the center
      height="100vh" // Use the full viewport height
      ref={ref}
    >
      {/* Container for the image and the icon button */}
      <Box position="absolute" textAlign="center">
        <motion.img
          src="/arttext.png" // Replace with your image path
          alt="Descriptive Alt Text" // Replace with a meaningful image description
          variants={imageVariants}
          initial='hidden'
          animate="visible"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <IconButton
          onClick={onProceed}
          variants={variantButton}
          whileHover="hover"
          whileTap="tap"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '20px',
            transform: 'translateX(-50%)',
            color: 'black', // Adjust the color based on your image
          }}
        >
          <MotionIconButton 
            variants={variantButton}
            whileHover="hover"
            whileTap="tap"
            fontSize="large" 
            style={{
              // Inline CSS for focus state
              outline: 'none', // Remove default
              boxShadow: '0px' // Add custom yellow glow
            }}
            />
        </IconButton>
      </Box>
    </Box>
  );
});

export default FirstComponent;

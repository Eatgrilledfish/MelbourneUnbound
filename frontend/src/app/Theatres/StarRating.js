import React, { useState } from 'react';
import { Rating, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export default function InteractiveStarRating() {
  const [value, setValue] = useState(2); // Default value can be adjusted

  // Wrapper for the star icon to apply motion effects
  const MotionStarIcon = ({ filled = false }) => (
    <motion.span
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.9 }}
    >
      {filled ? <StarIcon color="rgb(245, 197, 24)" /> : <StarBorderIcon color="action" />}
    </motion.span>
  );

  return (
    <Stack spacing={1}>
      <Rating
        name="customized-rating"
        defaultValue={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        icon={<MotionStarIcon filled={true} />} // Filled star with motion
        emptyIcon={<MotionStarIcon />} // Empty star with motion
      />
    </Stack>
  );
}

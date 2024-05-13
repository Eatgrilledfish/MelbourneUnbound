import React, { useState, useRef, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import StarRating from './StarRating';
import { motion, AnimatePresence } from 'framer-motion'; // Import Framer Motion
// 创建一个转场组件
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} timeout={500} />;
});

function InteractiveStar() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const videoRef = useRef(null);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    let timer;
    if (showAnimation) {
      // Assume the GIF takes 3000 milliseconds (3 seconds) to play through
      timer = setTimeout(() => {
        setOpen(false); // Close the dialog after the GIF plays
        setShowAnimation(false);
      }, 1500);
    }
    return () => clearTimeout(timer); // Clean up the timer
  }, [showAnimation]);


  const handleMouseOver = () => {
    if (videoRef.current) videoRef.current.play();
  };

  const handleMouseOut = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;  // 重置视频到开头
    }
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleRate = () => {
    setShowAnimation(true);
  };




  return (
    <>
      <video
        ref={videoRef}
        src="favourite.mp4"
        loop
        muted
        style={{ width: '50px', height: '50px', cursor: 'pointer' }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          sx: {
            backgroundColor: '#BFBFBF',// 调整为浅灰色背景
            minWidth: '500px',
            display: 'flex', // Use flexbox to allow centering
            flexDirection: 'column', // Stack children vertically
            justifyContent: 'center', // Center vertically
            alignItems: 'center', // Center horizontally
            padding: '10px'
          }
        }}
      >
        <DialogContent sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <AnimatePresence>
            {showAnimation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  top: '60%',
                  left: '70%',
                  transform: 'translate(-50%, -50%)', // Center the div
                  zIndex: 2 // Ensure it's above all other content
                }}
              >
                <img
                  src="submission-animation.gif"
                  alt="Submission Animation"
                  style={{ width: '50px', height: '50px' }} // Adjust size as needed
                />
              </motion.div>
            )}
          </AnimatePresence>
          <Typography variant="h6"
            sx={{
              textAlign: 'center', // Centers the text
              color: '#404040', // Sets the background to yellow
              fontSize: '0.875rem' // Smaller font size, equivalent to ~14px
            }}
          >Rate This
          </Typography>
          <StarRating rating={rating} setRating={setRating} />
          <Button sx={{
            backgroundColor: '#D9D9D9',
            color: 'black',
            m: 1,
            width: 'auto',
            padding: '0 50px',
            fontSize: '0.7rem',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#F2C335', // 使用主题中的次要颜色
              opacity: 0.9 // 添加透明度以增强视觉效果
            },
          }} variant="contained" onClick={() => { handleClose; handleRate(rating) }}>Rate</Button>

        </DialogContent>
      </Dialog>
    </>
  );
}

export default InteractiveStar;

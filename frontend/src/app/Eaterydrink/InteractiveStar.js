import React, { useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import StarRating from './StarRating'

// 创建一个转场组件
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} timeout={500} />;
});

function InteractiveStar() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const videoRef = useRef(null);

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
    setOpen(false);
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
            backgroundColor: '#D7D7D9' // 调整为浅灰色背景
          }
        }}
      >
        <DialogContent>
        <Typography variant="h6">Rate your experience</Typography>
          <StarRating rating={rating} setRating={setRating} />
          <Button onClick={() =>{handleClose;handleRate(rating)}}>Rate</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default InteractiveStar;

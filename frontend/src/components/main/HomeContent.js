// pages/index.js 或 pages/index.tsx
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Card, Container, CardContent, useTheme, CardActionArea, CardMedia, Typography, Button, useMediaQuery } from '@mui/material';
import '../../styles/globals.css';


export default function Home() {
  // 假设这些是您的数据
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const features = [
    {
      title: 'Find Different Types Of Accessible Spots',
      description: 'EXPLORE ACCESSIBLE SPOTS',
      imageUrl: '/spots.png',
      action: 'explore'
    },
    {
      title: 'Find Different Modes Of Transport That Are Accessible',
      description: 'NAVIGATE',
      imageUrl: '/travel.png',
      action: 'navigate'
    },
    {
      title: 'Select A Location And We Help You Navigate',
      description: 'PLAN IT OUT',
      imageUrl: '/route.png',
      action: 'plan'
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 0, overflow: 'auto' }}> {/* 调整了内边距 */}
      <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: '1000px', margin: 'auto' }}> {/* 调整了间距 */}
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index} >
            <Card elevation={0} sx={{ display: 'flex', flexDirection: 'column', display: { xs: 'none', md: 'block' } }}> {/* 始终使用列布局 */}
              <CardActionArea component="a" href="#">
                <CardMedia
                  component="img"
                  height="400" // 调整高度
                  image={feature.imageUrl}
                  alt={feature.title}
                  sx={{ borderRadius: 4 }}
                />
              </CardActionArea>
              <CardContent sx={{ paddingLeft: '1px' }}>
                <CardActionArea component="a" href="#">
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
            {/* 小屏幕 */}
            <Card elevation={0} sx={{ display: 'flex', flexDirection: 'column', display: { xs: 'column', md: 'none' } }}> {/* 始终使用列布局 */}
              <CardActionArea component="a" href="#">
                <CardMedia
                  component="img"
                  height="150" // 调整高度
                  image={feature.imageUrl}
                  alt={feature.title}
                  sx={{ borderRadius: 4 }}
                />
              </CardActionArea>
              <CardContent sx={{ paddingLeft: '1px' }}>
                <CardActionArea component="a" href="#">
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
          </Grid>
        ))}

      </Grid>
      {/* 中间分隔栏 */}
      {/* 大屏幕显示 */}
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
          <b>See the Breakdown of Wheelchair-Friendly Dining in Melbourne's CBD</b>
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
          <b>See the Breakdown of Wheelchair-Friendly Dining in Melbourne's CBD</b>
        </Typography>
      </Grid>


      {/* 下方的文本 */}
      <Grid item xs={12} container spacing={3} sx={{ maxWidth: '1000px', margin: 'auto' }}> {/* 使用容器型Grid项 */}
        <Grid item xs={12} md={6} sx={{ textAlign: 'center', color: 'rgb(32, 20, 69)', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex', }}>
          {/* 文本内容 */}
          <Typography variant="h8">
            Explore the distribution of restaurants based on their accessibility ratings in the CBD. This bar chart illustrates the number of restaurants falling into different accessibility categories
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* 图片内容 */}
          <CardMedia
            component="img"
            image="barchart.jpeg" // 替换为您的图片路径
            alt="Accessibility Rating Distribution"
            sx={{
              width: '100%', // 保证图片填满Grid项
              height: 'auto', // 保持图片的高度自适应
              borderRadius: '4px', // 如果需要圆角
            }}
          />
        </Grid>
      </Grid>

    </Box>
  );
}

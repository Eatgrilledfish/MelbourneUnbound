import * as React from 'react';
import { useState,useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { usePathname,useRouter } from 'next/navigation'; 


const pages = [
  { name: 'Home', path: '/' },
  { name: 'Recreation', path: '/Recreation' },
  { name: 'Travel', path: '/Travel' }
];


function useEnhancedTrigger(options) {
  const trigger = useScrollTrigger(options);
  const [lastScroll, setLastScroll] =React.useState(typeof window !== 'undefined' ? window.pageYOffset : 0);
  const [hide, setHide] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return; // 如果是服务器环境，直接返回不执行以下代码
    }
    const handleScroll = () => {
      const currentScroll = window.pageYOffset; // 获取当前滚动位置
      // console.log('Current Scroll:', currentScroll); // 调试当前滚动位置
      // console.log('Last Scroll:', lastScroll); // 调试上一次滚动位置

      if (lastScroll > currentScroll) {
        // console.log('Scrolling Up - Showing AppBar'); // 向上滚动时的调试输出
        setHide(false); // 向上滚动时显示AppBar
      } else if (lastScroll < currentScroll) {
        // console.log('Scrolling Down - Hiding AppBar'); // 向下滚动时的调试输出
        setHide(true); // 向下滚动时隐藏AppBar
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    // console.log('Scroll Event Listener Added'); // 添加监听时的调试输出

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // console.log('Scroll Event Listener Removed'); // 移除监听时的调试输出
    };
  }, [lastScroll]); // 注意这里使用 lastScroll 作为依赖

  // console.log('Hide State:', hide); // 调试隐藏状态
  // console.log('Trigger State:', trigger); // 调试useScrollTrigger返回的状态
  // console.log('final result', hide && trigger);
  return hide && trigger;

}

function HideOnScroll(props) {
  const { children } = props;
  const shouldHideAppBar = useEnhancedTrigger({
    threshold: 250,
    disableHysteresis: true,
  });

  return (
    <Slide
      appear={false}
      direction="down"
      in={!shouldHideAppBar}
      timeout={{
        enter: 500, // Duration for enter animation, default is 225ms
        exit: 495  // Duration for exit animation, default is 195ms
      }}
      easing={{
        enter: 'cubic-bezier(0, 1.5, .8, 1)', // Customize the transition easing function for entering
        exit: 'linear' // Customize the transition easing function for exiting
      }}
    >
      {children}
    </Slide>
  );
}

function ResponsiveAppBar(props) {
  const pathname = usePathname()
  const [activePage, setActivePage] = useState('Home');  // 默认活动页面为'Home'
  const router = useRouter();  // Use the navigate function
  
  

  const handleNavigation = (path) => () => {

    console.log(pathname)


    if (path === 'Home') {
        router.push(`/`);
    } else {
        router.push(`/${path}`); // Navigate to the respective page
    }
};

  
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const [hoveredItem, setHoveredItem] = useState(null);


  return (
    <HideOnScroll {...props}>
      <AppBar position="fixed" sx={{ backgroundColor: 'grey.200', color: 'black' }} elevation={0}>
        <Container maxWidth="100%">
          <Toolbar disableGutters>
            {/* 大屏幕显示logo */}
            <Typography
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'sans-serif',
              }}
            >
              <Box component="img" src="NewLogo.png" alt="LOGO" sx={{ height: 90}} />
            </Typography>
            {/* 小屏幕显示菜单栏 */}
            <Box  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' },justifyContent: 'flex-end', 
            }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{
                  
                  '&:hover': {
                    backgroundColor: 'orange',  // Changes background to orange on hover
                    textDecoration: 'underline'
                  }
                }}
                
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  
                }}
              >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.name}
                      onClick={handleNavigation(page.name)}
                      onMouseEnter={() => setHoveredItem(page.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      sx={{
                        backgroundColor: pathname === page.path && !hoveredItem ? 'orange' : 'transparent', 
                        '&:hover': {
                          backgroundColor: 'orange',
                          textDecoration: 'underline'
                        }
                    
                  }}>
                    <Typography textAlign="center"
                      sx={{
                        fontFamily: 'sans-serif',
                        color: 'rgb(32, 20, 69)',
                      }}>{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* 小屏幕显示logo */}
            <Typography
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,

              }}
            >
              <Box component="img" src="NewLogo.png" alt="LOGO" sx={{ height: 90 }} />
            </Typography>
            {/* 大屏幕显示菜单栏 */}
            <Box sx={{ flexGrow: 1, bgcolor:'grey.200',display: { xs: 'none', md: 'flex' },justifyContent: 'flex-end' }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleNavigation(page.name)}
                  onMouseEnter={() => setHoveredItem(page.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  sx={{
                    my: 2,
                    color: 'black',
                    display: 'block',
                    fontFamily: 'sans-serif',
                    
                    color: 'rgb(32, 20, 69)',
                    padding: '10px 60px',
                    fontSize: '1rem',
                    backgroundColor: hoveredItem === page.name ? 'orange' : (pathname === page.path && hoveredItem === null ? 'orange' : 'transparent'),
                    '&:hover': {
                      backgroundColor: 'orange',
                      textDecoration: 'underline'
                    }
                    
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}
export default ResponsiveAppBar;

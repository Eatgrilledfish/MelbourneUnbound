import * as React from 'react';
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
import { useRouter } from 'next/navigation'; 



const pages = ['Recreation', 'Planning', 'Travel', 'Coming soon'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    threshold: 100,
    disableHysteresis: true,
  });

  return (
    <Slide
      appear={false}
      direction="down"
      in={!trigger}
      timeout={{
        enter: 225, // Duration for enter animation, default is 225ms
        exit: 195  // Duration for exit animation, default is 195ms
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
  const router = useRouter();  // Use the navigate function

  const handleNavigation = (path) => () => {
    router.push(`/${path}`);  // Use navigate instead of router.push
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <HideOnScroll {...props}>
      <AppBar position="fixed" sx={{ backgroundColor: 'white', color: 'black' }} elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* 大屏幕显示logo */}
            <Typography
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'sans-serif',
              }}
            >
              <Box component="img" src="logo.gif" alt="LOGO" sx={{ height: 80, mb: 1 }} />
            </Typography>
            {/* 小屏幕显示菜单栏 */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
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
                  <MenuItem key={page} onClick={handleNavigation(page)}>
                    <Typography textAlign="center"
                      sx={{
                        fontFamily: 'sans-serif',
                        color: 'rgb(32, 20, 69)',
                      }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* 小屏幕显示logo */}
            <Typography
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,

              }}
            >
              <Box component="img" src="logo.gif" alt="LOGO" sx={{ height: 80, mb: 1 }} />
            </Typography>
            {/* 大屏幕显示菜单栏 */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleNavigation(page)}
                  sx={{
                    my: 2,
                    color: 'black',
                    display: 'block',
                    fontFamily: 'sans-serif',
                    color: 'rgb(32, 20, 69)',
                    padding: '10px 60px',
                    fontSize: '1rem',

                  }}
                >
                  {page}
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

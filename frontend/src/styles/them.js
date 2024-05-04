// Create a theme instance in your theme.js file or wherever you set up the MUI theme
import { createTheme } from '@mui/material/styles';



const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'Noto Sans',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji',
    ].join(','),
  },
  palette: {
    text: {
      primary: 'rgb(32, 20, 69)',  // 主要文字颜色
      secondary: 'rgb(32, 20, 69)' // 次要文字颜色
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: [
            'Poppins',
            'ui-sans-serif',
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Roboto',
            'Helvetica Neue',
            'Arial',
            'Noto Sans',
            'sans-serif',
            'Apple Color Emoji',
            'Segoe UI Emoji',
            'Segoe UI Symbol',
            'Noto Color Emoji',
          ].join(','),
          color: 'rgb(32, 20, 69)',
        }
      }
    }
  }
});

export default theme;


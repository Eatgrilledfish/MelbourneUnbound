// Create a theme instance in your theme.js file or wherever you set up the MUI theme
import { createTheme } from '@mui/material/styles';



const theme = createTheme({

  palette: {
    text: {
      primary: 'rgb(32, 20, 69)',  // 主要文字颜色
      secondary: 'rgb(32, 20, 69)' // 次要文字颜色
    }
  }
});

export default theme;


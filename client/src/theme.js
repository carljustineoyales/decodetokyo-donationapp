import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary:{
      main:"#009883",
      // light:"#01A891",
      contrastText:"#fff"
    },
    secondary:{
      main:"#9F9F9F",
      // light:"#B7B7B7",
      contrastText:"#fff",
      
    },
  },
  shadows: ["none"]
});

export default theme;
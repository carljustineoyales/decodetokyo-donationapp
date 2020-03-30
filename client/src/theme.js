import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary:{
      main:"#009883",
      light:"#52c9b2",
      dark:'#006956',
      contrastText:"#fff"
    },
    secondary:{
      main:"#9F9F9F",
      light:"#d0d0d0",
      dark:'#717171',
      contrastText:"#fff",
      
    },
  },
  shadows: ["none"]
});

export default theme;
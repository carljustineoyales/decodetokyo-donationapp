import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import LoggedInContextProvider, { LoggedInContext } from './contexts/LoggedInContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme'
ReactDOM.render(
<BrowserRouter>
<LoggedInContextProvider>
<LoggedInContext.Consumer>{(context)=>{
  const {handleOnSuccess, loggedin, role,done} = context
  return(
    <ThemeProvider theme={theme}>
    <App handleOnSuccess={handleOnSuccess} loggedin={loggedin} role={role} done={done}/>
    </ThemeProvider>
  )
}}

</LoggedInContext.Consumer>

</LoggedInContextProvider>

</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. Learn
// more about service workers: https://bit.ly/CRA-PWA

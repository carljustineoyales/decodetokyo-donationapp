import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import LoggedInContextProvider, { LoggedInContext } from './contexts/LoggedInContext';

ReactDOM.render(
<BrowserRouter>
<LoggedInContextProvider>
<LoggedInContext.Consumer>{(context)=>{
  const {handleOnSuccess, loggedin, role} = context
  return(
    <App handleOnSuccess={handleOnSuccess} loggedin={loggedin} role={role}/>
  )
}}

</LoggedInContext.Consumer>

</LoggedInContextProvider>

</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. Learn
// more about service workers: https://bit.ly/CRA-PWA

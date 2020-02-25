import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import {withToken,getdone} from '../components/functions'
import Navbar from '../components/Home/Navbar';

import Login from '../components/Home/Login';
import { LoggedInContext } from '../contexts/LoggedInContext';
export class LoginPage extends Component {
  
  render() {

    if (withToken()) {
      if(getdone() === 'false'){
        return (<Redirect to={`/personalinfo`}/>)
      }else{
        return (<Redirect to={`/feed`}/>)
        
      }
      
    } else {
      return (
        <LoggedInContext.Consumer>{(context)=>{
          const { handleOnSuccess,id} = context
          return(
            <Fragment>
          <Navbar/>
          <main>
            <div className='container'>

              <Login handleOnSuccess={handleOnSuccess} id={id}/>

            </div>
          </main>

        </Fragment>
          )
        }}

        </LoggedInContext.Consumer>
        
      );
    }

  }
}

export default LoginPage;

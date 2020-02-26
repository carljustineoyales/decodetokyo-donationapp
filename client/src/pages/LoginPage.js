import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import {withToken,getdone} from '../components/functions'
import Navbar from '../components/Home/Navbar';

import Login from '../components/Home/Login';
import { LoggedInContext } from '../contexts/LoggedInContext';

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      loggedin:false,
      done:false
    }
  }
  
  render() {

    if (this.state.loggedin) {
      if(this.state.done){
        return (<Redirect to={`/personalinfo`}/>)
      }else{
        return (<Redirect to={`/feed`}/>)
        
      }
      
    } else {
      return (
        <LoggedInContext.Consumer>{(context)=>{
          const { handleOnSuccess,id,loggedin,done} = context;
          this.state.loggedin = loggedin;
          this.state.done = done;
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

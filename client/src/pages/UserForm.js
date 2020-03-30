import React, {Component, Fragment} from 'react';
import Registration from '../components/forms/Registration';
import axios from 'axios';
import {withToken} from '../components/functions';
import {RegistrationContext} from '../contexts/RegistrationContext'
import {LoggedInContext} from '../contexts/LoggedInContext'
import Verification from './Verification';

export class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      title: '',
      description: '',
      goalFund: '',
      currency: '',
      id: '',
      username: '',
      password: '',
      error: '',
      loggedin:false
    }
    this.redirect = this.redirect.bind(this)
  }
  
  
  login = (user, pass) => {
    const data = {
      identifier: user,
      password: pass
    }
  }

  
  
  redirect = () => {
    
    if (this.state.loggedin) {
      console.log('redirecting')
      window.parent.location = '/create-campaign';
    }
  }

  render() {
    return(
      <LoggedInContext>{(LoggedInContext)=>{
        const {loggedin} = LoggedInContext;
        this.state.loggedin = loggedin
        return(
          <RegistrationContext.Consumer>{(context) => {
      const {isSuccess,handleOnSuccess} = context;
      if(!isSuccess){
        return (
      <Fragment>
      
        <Registration login={this.login} success={isSuccess} handleOnSuccess={handleOnSuccess}/>
      </Fragment>
    );
      }else{
        return(
          <Verification/>
        )
      }
      
    }}

    </RegistrationContext.Consumer>
    );
    
      }}</LoggedInContext>
    
    
    );
  }

}

export default UserForm;

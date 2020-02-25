import React, {Component, Fragment} from 'react';
import Registration from '../components/forms/Registration';
import axios from 'axios';
import {strapi, withToken} from '../components/functions';
import {RegistrationContext} from '../contexts/RegistrationContext'
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
    //Check this
    if (withToken()) {
      console.log('redirecting')
      window.parent.location = '/create-campaign';
    }
  }

  render() {
    return(<RegistrationContext.Consumer>{(context) => {
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

    </RegistrationContext.Consumer>);
    
   
  }

}

export default UserForm;

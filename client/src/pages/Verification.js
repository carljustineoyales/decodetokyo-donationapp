import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { RegistrationContext } from '../contexts/RegistrationContext';
import axios from 'axios';
import {Button} from '@material-ui/core'
export class Verification extends Component {

  constructor(props) {
    super(props);
    this.state={
      email:''
    }
    this.resendVerification = this.resendVerification.bind(this)
  }

  resendVerification = () =>{
    axios({
      url:'/resendverification',
      method:'post',
      data:{
        email:this.state.email
      }
    })
      .then(res=>{alert('Verification Sent')})
      .catch(err=>{console.log(err.response)})
  }

  render() {
    return (
      <RegistrationContext.Consumer>{(context)=>{
        const {email} = context;
        this.state.email = email
        return(
          <div>
        <h1>Verify your Email</h1>
        <p>Verify first your email to log in to your account.</p>
        <p>We recommend to verify your email to create a campaign</p>
        <p>If you want to browse the campaigns you can click the <strong>'Support'</strong> link on the navigation bar or click <Link to={'/feed'}>here</Link></p>
        <Button variant='contained' color='primary' onClick={this.resendVerification}>Resend Verification</Button>
      </div>
        )
      }}</RegistrationContext.Consumer>
      
    );
  }
}

export default Verification;

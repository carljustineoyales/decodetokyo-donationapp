import React, { Component } from 'react';
import axios from 'axios';
import {strapi} from '../components/functions'
import Navbar from '../components/Home/Navbar';

export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state={
      email:'',
      isSuccess:false
    }
    this.hanldeOnSubmit = this.hanldeOnSubmit.bind(this);
    // this.hanldeOnChange = this.hanldeOnChange.bind(this);
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  hanldeOnSubmit = (event) =>{
    const {email} = this.state
    event.preventDefault();
    axios.post(`${strapi}/auth/forgot-password`,{
      email,
      url:`https://radiant-hollows-04485.herokuapp.com/reset-password`
    })
    .then(res=>{
      this.setState({
        isSuccess:true
      })
    })
    .catch(err=>{alert('This email does not exist.')})
  }
  
  
  
  render() {
    const {isSuccess} = this.state
    if (isSuccess) {
      return (
        <>
        <Navbar/>
        <main>
            <div className='container'>
            <h1>You will receive an email to reset your password in a few minutes. Thank you!</h1>
          
            </div>
        </main>
        </>
      );
    } else {
      return (
        <>
        <Navbar/>
        <main>
            <div className='container'>
            <form onSubmit={this.hanldeOnSubmit}>
        <label>Email</label><br/>
        <input type='email' name='email' onChange={this.handleOnChange}/><br/><br/>
          <button>Reset Password</button>
        </form>
          
            </div>
        </main>
        </>
      );
    }
    
  }
}

export default ChangePassword;

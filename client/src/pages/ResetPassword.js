import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import Navbar from '../components/Home/Navbar';
import {strapi} from '../components/functions'
export class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.state={
      password:'',
      passwordConfirmation:'',
      code:'',
      isSuccess:false
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }
  
  componentDidMount () {
    this.setState({
      code:queryString.parse(this.props.location.search)
    })
    
    
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    const {passwordConfirmation, password} =this.state;

    if (password === passwordConfirmation) {

      //move to backend
    // axios.post(`${strapi}/auth/reset-password`,{
    //   code:this.state.code.code,
    //   password,
    //   passwordConfirmation
    // })
    axios({
      url:'/resetpassword',
      method:'post',
      data:{
        code:this.state.code.code,
        password:password,
        passwordConfirmation:passwordConfirmation
      }
    })
    .then(res=>{
      this.setState({
        isSuccess:true
      })
    })
    .catch(err=>console.log(err.response))
    } else {
      alert('password does not match')
    }
    
  }


  render() {
    const {isSuccess} = this.state
    if (isSuccess) {
      return(
        <>
        <Navbar/>
        <main>
            <div className='container'>
            <h1>you've successfully changed your password please enter your new credentials to log in. Thank you!</h1>
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
          <form onSubmit={this.handleOnSubmit}>
          <label>New Password</label><br/>
            <input type='password' name='password' onChange={this.handleOnChange}/><br/><br/>
            <label>Confirm Password</label><br/>
            <input type='password' name='passwordConfirmation' onChange={this.handleOnChange}/><br/><br/>
            <button>Submit</button>
          </form>
          </div>
          </main>
        </>
      );
    }
    
  }
}

export default ResetPassword;

import React, { Component } from 'react';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer'
import axios from 'axios';
import { Link } from 'react-router-dom';
import validator from 'validator'

export class ResendEmailVerification extends Component {


  constructor(props) {
    super(props);
    this.state ={
      email:'',
      isSuccess:false,
      error:'',
      inputError:''
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value,
      inputError:''
    })
    if(validator.isEmpty(event.target.value)){
     
      console.log('Enter Email')
      this.setState({
        inputError:'Enter Email'
      })
    }else if(!validator.isEmail(event.target.value)){
      
      this.setState({
        inputError:'Enter valid Email'
      })
    }
  }
  
  handleOnClick = (event) => {
    event.preventDefault();
    this.setState({
      error:'',
      isSuccess:false
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    if(validator.isEmpty(this.state.inputError)){
      axios({
        url:'/resendverification',
        method:'post',
        data:{
          email:this.state.email
        }
      })
      .then(res=>{
        this.setState({
          isSuccess:true
        })
      })
      .catch(err=>{
        console.log(err.response.data.message)
        if(err.response.data.message === 'missing.email'){
          this.setState({
            inputError:'Enter Email'
          })
        }else{
          this.setState({
            error:err.response.data.message
          })
        }
        
      })
    }
    
  }

  render() {
    return (
      <>
      <Navbar/>
      <main>
        <div className='container'>
          <div className="row">
          <div className="col">
         
          {(this.state.error === 'An internal server error occurred') ? (
            <>
            <h1>{this.state.email} not found please register first</h1>
            <button onClick={this.handleOnClick}>Go back</button>
            </>
          ):((this.state.error === 'already.confirmed') ? (
            <>
            <h1>{this.state.email} is already verified please login <Link to={'login'}>here</Link></h1>
            </>
          ) : (
            (this.state.isSuccess) ? (
            <>
            <h1>Email Verification Sent to {this.state.email}</h1>
            <button onClick={this.handleOnClick}>Not Recieved?</button>
            </>
          ):(
            <>
            <h1>Your email is not yet verified</h1>
            <div className='errors'>
            <h3>
              {this.state.inputError}
            </h3>
          </div>
              <form onSubmit={this.handleOnSubmit}>
                <input type='email' name='email' onChange={this.handleOnChange} value={this.state.email}/>
                <button>Resend Verification</button>
              </form>
              </>
          )))}
          
          </div>
          </div>
        </div>
      </main>
      <Footer/>
      </>
    );
  }
}

export default ResendEmailVerification;

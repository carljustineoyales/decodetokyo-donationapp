import React, { Component } from 'react';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer'
import axios from 'axios';
import { Link } from 'react-router-dom';
import validator from 'validator'
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { TextField,Button, Typography } from '@material-ui/core';

const useStyles = theme => ({
  mainStyle:{
    width:'100vw',
    height:'100vh',
    margin:'0'
  },
  paperStyleBackground:{
    background: 'rgb(0,152,131)',
    background: 'linear-gradient(-45deg, rgba(0,152,131,1) 0%, rgba(0,192,99,1) 100%)',
    borderRadius:'0',
    height:'100vh',
    display:'flex',
    flowDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    color:'#fff',
    textAlign:'center'
  },
  paperStyle:{
    background:'white',
    borderRadius:'0',
    
  },
  linkStyle:{
    color:'#fff',
    "&:hover": {
      textDecoration:'none',
      color:'#fff',
    }
  }
})
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
    const {classes} = this.props
    return (
      <>
      {/* <Navbar/>
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
      <Footer/> */}
      <main className={classes.mainStyle}>
            
              <Grid container>
                <Grid item xs={6} className={classes.paperStyleBackground}>
                  <div>
                  <h1><Link className={classes.linkStyle} to={'/'}>Logo</Link></h1>
                  <h4>Share and Donate</h4>
                  </div>
                </Grid>
                
               
                <Grid container item xs={6} direction='row' justify='center' alignContent='center'>
                { (this.state.isSuccess) ? (<>
                <Typography variant='h1' style={{fontSize:'32px'}}>
                  Verification Sent
                </Typography>
                </>):(
                  <>
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
                <TextField variant='outlined' label='Email' type='email' name='email' onChange={this.handleOnChange} value={this.state.email}/>
                <br/><br/>
                <Button variant='contained' color='primary' type='submit'>Resend Verification</Button>
              </form>
              </>
          )))}
                  </>
                ) }
                
                  
                  
                </Grid>
                  
                
              </Grid>
              

            
          </main>
      </>
    );
  }
}

export default withStyles(useStyles)(ResendEmailVerification);

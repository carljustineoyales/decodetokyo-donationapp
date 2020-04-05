import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { flexbox } from '@material-ui/system';
import {Box,Input, TextField, Grid, Button, withStyles} from '@material-ui/core';
import validator from 'validator';
import {Alert} from '@material-ui/lab';
const useStyles = theme => ({
  errors:{
    width:'100%'
  }
  
})
class Registration extends Component {

  constructor(props) {
    
    super(props);
    this.state = {
      paypal_email: '',
      gcash_number: '',
      first_name: '',
      last_name: '',
      email: '',
      address: '',
      city: '',
      zipcode: '',
      country: 'Philippines',
      confirmEmail: '',
      password: '',
      bank_account: '',
      bank_name: '',
      errors: [],
      isLoading: false,
      noErrors: false,
      axiosError: '',
      sent: false,
      emailMatched:false,
      show:false,
      disable:true
    }
    this.handleOnChange = this
      .handleOnChange
      .bind(this)
    this.OnSuccess = this.OnSuccess.bind(this)
  }

  OnSuccess = () => {
    this.props.handleOnSuccess(this.state.email)
  }

  continue = (event) => {
    event.preventDefault();
    if(validator.isEmpty(this.state.country)){
      console.log('empty country')
      if(!this.state.errors.includes('Empty Country.')){
        this.state.errors.push('Empty Country.');
        this.setState({
                  isLoading: true,
                })
      }
    }
    
    if(validator.isEmpty(this.state.password)){
      if(!this.state.errors.includes('Empty Password.')){
        this.state.errors.push('Empty Password.');
        this.setState({
                  isLoading: true,
                })
      }
    }
    let username = this.state.email.split('@')
    console.log(username[0])
    
    const data ={
    // paypal_email: this.state.paypal_email,
    // gcash_number: this.state.gcash_number,
    email: this.state.email,
    username: username[0],
    password: this.state.password,
    confirmed:false,
    done:false,
    // country:this.state.country
    }
    if(validator.isEmpty(this.state.email) && validator.isEmpty(this.state.confirmEmail)){
      this.state.errors.push('Empty Email.')
    }else{
      if(this.state.errors.length <= 0){
        if(this.state.emailMatched){

          axios({
                url:'/registeruser',
                method:'post',
                data
              })
              .then(res=>{
                console.log('continue function axios',res.data)
                this.OnSuccess();
              })
              .catch(err=>{
                console.log(err.response.data[0].messages[0])
                
                try {
                  if(err.response.data[0].messages[0].id === 'Auth.form.error.username.taken'){
                    this.state.errors.push('Email already taken.')
                  }else{
                    if(!this.state.errors.includes(err.response.data[0].messages[0].message)){
                      this.state.errors.push(err.response.data[0].messages[0].message)
                    }else if(this.state.errors.includes(err.response.data[0].messages[0].message)){
                      this.state.errors = this.state.errors.filter(item => item !== err.response.data[0].messages[0].message);
                    }
                  }
                  
                  
          
                  
                } catch (error) {
                  console.log(err.response.data)
                  err.response.data.map(item=>{
                    if(!this.state.errors.includes(item)){
                            this.state.errors.push(item)
                          }
                  })
                }
               this.setState({
                    isLoading: true,
                  })
              })
            }
            
            else{
              if(!this.state.errors.includes('Email does not match.')){
                this.state.errors.push('Email does not match.')
                this.setState({
                  isLoading:true
                })
              }
        }
      }else{
        window.scrollTo(0,0)
      }
      
    }  
  }

  
  

  handleOnChange = (event) => {
    
    this.setState({
      [event.target.name]: event.target.value,
      
    });
    
  if(event.target.value !== '' || event.target.value !== null){
    console.log(this.state.email.length)
    if(event.target.name === 'email'){
      if(!validator.isEmpty(this.state.confirmEmail)){
        console.log('confirm email',!validator.isEmpty(this.state.confirmEmail))
        if(event.target.value !== this.state.confirmEmail){
          if(!this.state.errors.includes('Email does not match.')){
            this.state.errors.push('Email does not match.')

          }
          this.setState({
            emailMatched:false,
            
          })
        }else{
          this.setState({
            emailMatched:true
          })
          if(this.state.errors.includes('Email does not match.')){
            this.state.errors = this.state.errors.filter(item => item !== 'Email does not match.')
          }
        }
      }
      if(this.state.errors.includes('Empty Email.')){
        this.state.errors = this.state.errors.filter(item => item !== 'Empty Email.')
      }
      if(this.state.errors.includes('Invalid Email.')){
        this.state.errors = this.state.errors.filter(item => item !== 'Invalid Email.')
      }
      if(this.state.errors.includes('Email already taken.')){
        this.state.errors = this.state.errors.filter(item => item !== 'Email already taken.')
      }
    }
    if(event.target.name === 'confirmEmail'){
      if(event.target.value !== this.state.email){
        if(!this.state.errors.includes('Email does not match.')){
          this.state.errors.push('Email does not match.')
        }
        this.setState({
          emailMatched:false,
        })
      }else{
        this.setState({
          emailMatched:true
        })
        if(this.state.errors.includes('Email does not match.')){
          this.state.errors = this.state.errors.filter(item => item !== 'Email does not match.')
        }
      }
    }
      if(event.target.value.length === 0){
        this.setState({
          
          disable:true,
          errors:[]
        })
      }else{
        
        this.setState({
          
          disable:false
        })
        
      }
      
      }
      
        
      if(event.target.name === 'password'){
        if(this.state.errors.includes('Empty Password.')){
          this.state.errors = this.state.errors.filter(item => item !== 'Empty Password.')
        }
      }
  
  
  }

  render() {
    const {classes} = this.props
    return (
      
      <Fragment>
        
       
        <form>
         
    
      <Grid container direction='row' alignContent='center' spacing={4} sm={12}>
      <Grid item xs={12}>
      {(this.state.axiosError.length > 0)
          ? <Alert  severity="error" fullWidth className={classes.errors}>
              {this.state.axiosError}
            </Alert>
          : ''}
        {(this.state.errors.length > 0)
          ? <Alert severity="error"  className={classes.errors}>{this
                .state
                .errors
                .map(error => (
                  <div key={error.id}>{error}</div>
                ))}</Alert>
          : ''}
      <h1>Sign Up</h1>
        <p>Register to create a campaign</p>
      </Grid>
      
        
        <Grid item xs={12}>
                <TextField
                id="outlined-password-input"
                name='email'
                label="Email"
                type="email"
                autoComplete="current-password"
                variant="outlined"
                fullWidth
                
                onChange={this.handleOnChange}
              />
        </Grid>
        <Grid item xs={12}>
              <TextField
              id="outlined-password-input"
              name='confirmEmail'
              label="Confirm Email"
              type="email"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
              
              value={this.state.confirmEmail}
              onChange={this.handleOnChange}
              disabled={this.state.disable}
            />
        </Grid>
        <Grid item xs={12}>

            <TextField
              name='password'
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            fullWidth
            onChange={this.handleOnChange}
            />

        </Grid>
        <Grid item sm={8} xs={12}>
          <Link to="/help">Need Help?</Link>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Button color='primary' fullWidth variant='contained' onClick={this.continue}>Continue</Button>
        </Grid>
            
            
        </Grid>
          
        </form>
      </Fragment>
    );
  }
  
}

export default withStyles(useStyles)(Registration);

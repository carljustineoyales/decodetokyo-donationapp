import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { flexbox } from '@material-ui/system';
import {Box,Input, TextField, Grid, Button} from '@material-ui/core';
import validator from 'validator';

export class Registration extends Component {

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
      show:false
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
    // else{
    //   if(this.state.country === 'Philippines'){
    //     if(validator.isEmpty(this.state.gcash_number)){
    //       console.log('empty gcash')
    //       if(!this.state.errors.includes('Empty Gcash.')){
    //         this.state.errors.push('Empty Gcash.');
    //         this.setState({
    //                   isLoading: true,
    //                 })
    //       }
    //     }
    //   }else{
        
    //     if(validator.isEmpty(this.state.paypal_email)){
    //       if(!this.state.errors.includes('Empty Paypal.')){
    //         this.state.errors.push('Empty Paypal.');
    //         this.setState({
    //                   isLoading: true,
    //                 })
    //       }
    //     }
    //   }
    // }
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
    paypal_email: this.state.paypal_email,
    gcash_number: this.state.gcash_number,
    email: this.state.email,
    username: username[0],
    password: this.state.password,
    confirmed:false,
    done:false,
    country:this.state.country
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
                  if(!this.state.errors.includes(err.response.data[0].messages[0].message)){
                    this.state.errors.push(err.response.data[0].messages[0].message)
                  }else if(this.state.errors.includes(err.response.data[0].messages[0].message)){
                    this.state.errors = this.state.errors.filter(item => item !== err.response.data[0].messages[0].message);
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

  showInputs = () => {
    switch (this.state.country) {
      case 'Philippines':
        return (
          <Fragment>
          <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="paypal_email">Paypal</label>
                </div>
                <input
                  className='form-control form-control-sm'
                  type='text'
                  placeholder='johndoe@email.com'
                  name="paypal_email"
                  id='paypal'
                  value={this.state.paypal_email}
                  onChange={this.handleOnChange}/>
                <a
                  href='#'
                  className="d-inline-block"
                  data-toggle="modal"
                  name='gcash'
                  // onClick={this.tooltip}
                  data-target="#exampleModal"
                  title='insert tooltip for gcash'>
                  
                  <img
                    src="https://img.icons8.com/material-rounded/18/000000/help.png"
                    alt='gcash-help-icon'/>
                </a>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        ...
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div className=' mb-3'>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="gcash_number">GCash</label>
                </div>
                <input
                  className='form-control form-control-sm'
                  type='text'
                  placeholder='+639XXXXXXXXX'
                  name="gcash_number"
                  id='gcash'
                  value={this.state.gcash_number}
                  onChange={this.handleOnChange}/>
                <a
                  href='#'
                  className="d-inline-block"
                  data-toggle="modal"
                  name='gcash'
                  // onClick={this.tooltip}
                  data-target="#exampleModal"
                  title='insert tooltip for gcash'>
                  
                  <img
                    src="https://img.icons8.com/material-rounded/18/000000/help.png"
                    alt='gcash-help-icon'/>
                </a>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        ...
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <small className="form-text text-muted">
                If you lived in the Philippines, you only need GCASH Number
              </small>
            </div>
            
          </Fragment>
        )

      default:
        return (
          <>
          <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="paypal_email">Paypal</label>
                </div>
                <input
                  className='form-control form-control-sm'
                  type='text'
                  placeholder='johndoe@email.com'
                  name="paypal_email"
                  id='paypal'
                  value={this.state.paypal_email}
                  onChange={this.handleOnChange}/>
                <a
                  href='#'
                  className="d-inline-block"
                  data-toggle="tooltip"
                  

                  onClick={this.tooltip}
                  title='insert tooltip for paypal'>
                  <img
                  
                    src="https://img.icons8.com/material-rounded/18/000000/help.png"
                    alt='paypal-help-icon'/>
                </a>
              </div>
          </>
        )
        break
    }
  }

  handleOnChange = (event) => {
    
    this.setState({
      [event.target.name]: event.target.value,
      
    })

  if(event.target.value !== '' || event.target.value !== null){
    // if(event.target.name === 'country'){
    //   if(this.state.errors.includes('Empty Country.')){
    //     this.state.errors = this.state.errors.filter(item => item !== 'Empty Country.')
    //   }
    //   if(this.state.errors.includes('Empty Gcash.')){
    //     this.state.errors = this.state.errors.filter(item => item !== 'Empty Gcash.')
    //   }
    // }
    // if(event.target.name === 'gcash_number'){
    //   if(this.state.errors.includes('Empty Gcash.')){
    //     this.state.errors = this.state.errors.filter(item => item !== 'Empty Gcash.')
    //   }
    // }
    
    // if(event.target.name === 'paypal_email'){
    //   if(this.state.errors.includes('Empty Paypal.')){
    //     this.state.errors = this.state.errors.filter(item => item !== 'Empty Paypal.')
    //   }
    // }
    if(event.target.name === 'email'){
      if(!validator.isEmpty(this.state.confirmEmail)){
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
    if(event.target.name === 'password'){
      if(this.state.errors.includes('Empty Password.')){
        this.state.errors = this.state.errors.filter(item => item !== 'Empty Password.')
      }
    }
  }
  }

  
  render() {

    return (
      
      <Fragment>
        
        {(this.state.axiosError.length > 0)
          ? <div className="alert alert-warning" role="alert">{this.state.axiosError}</div>
          : ''}
        {(this.state.errors.length > 0)
          ? <div className="alert alert-danger" role="alert">{this
                .state
                .errors
                .map(error => (
                  <div key={error.id}>{error}</div>
                ))}</div>
          : ''}
        <form>
          {/* <div className='row'>
            <div className="col-sm">

              <label htmlFor='country'>Country: <span className='red'>*</span></label>
              <input type='text' name='country' id='country' className="form-control form-control-sm" value={this.state.country} onChange={this.handleOnChange}/>
              
            </div>
          </div>
          <div className='row'>

            <div className='col-sm'>
              <label htmlFor='country'>Payment: <span className='red'>*</span></label>
              
              {this.showInputs()}
              
            </div>
          </div> */}

          {/* <div className='row'>
            <div className="col-sm">
              <label htmlFor='email'>Facebook or Email <span className='red'>*</span></label>

              <input
                className='form-control form-control-sm'
                type='text'
                placeholder='johndoe'
                name="email"
                id='email'
                onChange={this.handleOnChange}/>

            </div>
            <div className="col-sm">

              <label htmlFor='confirmemail'>Confirm Email</label>
              <input
                className='form-control form-control-sm'
                type='email'
                placeholder='johndoe@email.com'
                name="confirmEmail"
                id='confirm email'
                onChange={this.handleOnChange}/>

            </div>
            

          </div>
          
          <div className='row'>
          <div className="col-sm">

            <label htmlFor='password'>Password <span className='red'>*</span></label>
            <input
              className='form-control form-control-sm'
              type='password'
              placeholder='********'
              name="password"
              id='password'
              onChange={this.handleOnChange}/>
            </div>

          </div>

          
          <div className='row'>
            <div className="col-sm">
              <Link to="/help">Need Help?</Link>
            </div>
            <div className="col-sm">
              <button className='btn btn-primary w-100' onClick={this.continue}>Continue</button>
            </div>

          </div> */}
    
      <Grid container direction='row' alignContent='center' spacing={4} sm={12}>
      <Grid item>
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
              onChange={this.handleOnChange}
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

export default Registration;

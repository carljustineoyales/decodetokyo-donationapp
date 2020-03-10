import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {strapi} from '../functions';
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
      emailMatched:false
    }
    this.handleOnChange = this
      .handleOnChange
      .bind(this)
    this.OnSuccess = this.OnSuccess.bind(this)
  }

  // removeItem = (item) => {
  //   for (var i = 0; i < this.state.errors.length; i++) {
  //     if (this.state.errors[i] === item) {
  //       this
  //         .state
  //         .errors
  //         .splice(i, 1);
  //     }
  //   }
  // }

  checkCountry = () => {
    if (this.state.country === 'Philippines') {
      this.removeItem('Enter Paypal Email')
      if (this.state.gcash_number.length <= 0) {
        if (!this.state.errors.includes('Enter Gcash Number')) {
          this
            .state
            .errors
            .push('Enter Gcash Number')
        }
        this.setState({isLoading: false})
      } else {
        this.removeItem('Enter Gcash Number')
      }
    } else {
      this.removeItem('Enter Gcash Number')
      if (this.state.paypal_email.length <= 0) {
        if (!this.state.errors.includes('Enter Paypal Email')) {
          this
            .state
            .errors
            .push('Enter Paypal Email')
        }
        this.setState({isLoading: false})
      } else {
        this.removeItem('Enter Paypal Email')
      }
    }
  }

  OnSuccess = () => {
    this.props.handleOnSuccess(this.state.email)
  }

  continue = (event) => {
    event.preventDefault();
    const data ={
    paypal_email: this.state.paypal_email,
    gcash_number: this.state.gcash_number,
    email: this.state.email,
    username: this.state.email,
    password: this.state.password,
    confirmed:false,
    done:false,
    country:this.state.country
    }
    if(this.state.email === this.state.confirmEmail){
      //move to backend
    // axios.post(`${strapi}/users`, data)
    // if(this.state.errors.length <= 0){
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
        
        // console.log(err.response.data[0].messages[0].message)
        try {
          if(!this.state.errors.includes(err.response.data[0].messages[0].message)){
            this.state.errors.push(err.response.data[0].messages[0].message)
          }else if(this.state.errors.includes(err.response.data[0].messages[0].message)){
            this.state.errors = this.state.errors.filter(item => item !== err.response.data[0].messages[0].message);
          }
          
  
          
        } catch (error) {
          console.log(err.response.data)
          // err.response.data.map(item=>{
          //     if(!this.state.errors.includes(item)){
          //       this.state.errors.push(item)
          //     }
          //   }
          err.response.data.map(item=>{
            if(!this.state.errors.includes(item)){
                    this.state.errors.push(item)
                  }

          })
          // this.setState({
          //         isLoading: true,
          //       })
          
        }
       this.setState({
            isLoading: true,
          })
      })
    }
    
    else{
      if(!this.state.errors.includes(`email does not match`)){
        this.state.errors.push(`email does not match`)
        this.setState({
          isLoading:true
        })
      }
      else if(this.state.errors.includes(`email does not match`)){
        this.state.errors = this.state.errors.filter(item => item !== `email does not match`);
        this.setState({
          emailMatched:true
        })
      }
    }
    
    
  }

  showInputs = () => {
    switch (this.state.country) {
      case 'Philippines':
        return (
          <Fragment>
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
                  data-toggle="tooltip"
                  name='gcash'
                  onClick={this.tooltip}
                  title='insert tooltip for gcash'>
                  <img
                    src="https://img.icons8.com/material-rounded/18/000000/help.png"
                    alt='gcash-help-icon'/>
                </a>
              </div>
              <small className="form-text text-muted">
                If you lived in the Philippines, you only need GCASH Number
              </small>
            </div>
          </Fragment>
        )

      default:
        return ''
        break
    }
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    // if(event.target.name ==='confirmEmail'){
    //   if(event.target.value !== this.state.email){
    //     if(!this.state.errors.includes(`email does not match`)){
    //       this.state.errors.push(`email does not match`)
    //       this.setState({
    //         emailMatched:false,
    //         isLoading:true
    //       })
    //   }else{
    //     if(this.state.errors.includes(`email does not match`)){
    //       this.state.errors = this.state.errors.filter(item => item !== `email does not match`);
    //       this.setState({
    //         emailMatched:true,
    //         isLoading:true
    //       })
    //     }
    //   }
    // }
    
    if(event.target.value === '' || event.target.value === null){
      // console.log(`empty ${event.target.name}`)
      // if(event.target.name === 'bank_name' || event.target.name === 'bank_account'){
      //   return
      // }else{
        
        if(!this.state.errors.includes(`empty ${event.target.id}`)){
          this.state.errors.push(`empty ${event.target.id}`)
        }
        if(this.state.errors.includes(`invalid ${event.target.id}`)){
          this.state.errors = this.state.errors.filter(item => item !== `invalid ${event.target.id}`)
        }
      // }
      
    }else{
      if(this.state.errors.includes(`Email already taken.`)){
        this.state.errors = this.state.errors.filter(item => item !== `Email already taken.`)
      }
      if(event.target.name === 'country'){
        if(event.target.value !== 'Philippines'){
          if(this.state.errors.includes(`empty gcash`)){
            this.state.errors = this.state.errors.filter(item => item !== `empty gcash`)
          }
          else if(!this.state.errors.includes(`empty paypal`)){
            this.state.errors.push(`empty paypal`)
          }
        }else{
          if(this.state.errors.includes(`empty paypal`)){
            this.state.errors = this.state.errors.filter(item => item !== `empty paypal`)
          }
          else if(!this.state.errors.includes(`empty gcash`)){
            this.state.errors.push(`empty gcash`)
          }
        }
      }
      if(event.target.name === 'email'){
        
        let invalidEmail = validator.isEmail(event.target.name)
        // console.log(invalidEmail)
        if(invalidEmail){
          if(!this.state.errors.includes(`invalid ${event.target.id}`)){
            this.state.errors.push(`invalid ${event.target.id}`)
          }else{
            this.state.errors = this.state.errors.filter(item => item !== `invalid ${event.target.id}`)
          }
        }
      }
      if(this.state.errors.includes(`empty ${event.target.id}`)){
        console.log(`empty ${event.target.id}`)
        this.state.errors = this.state.errors.filter(item => item !== `empty ${event.target.id}`)
      }
    
  }
  }
  tooltip = (event) => {
    console.log(event.target.alt)
    switch (event.target.alt) {
      case 'paypal-help-icon':
        window.open('/paypaltooltip', "paypal","menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=500,heigh=500")

        break;
      case 'gcash-help-icon':
        window.open('/gcashtooltip', "paypal","menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=500,heigh=500")

        break;
    
      default:
        break;
    }
    return false;
  }
  render() {

    return (
      
      <Fragment>
        <h1>Sign Up</h1>
        <p>Register to create a campaign</p>
        <p>Note: don't leave input with (<span className='red'>*</span>) blank</p>
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
          <div className='row'>
            <div className="col-sm">

              <label htmlFor='country'>Country: <span className='red'>*</span></label>
              <input type='text' name='country' id='country' className="form-control form-control-sm" value={this.state.country} onChange={this.handleOnChange}/>
              
            </div>
          </div>
          <div className='row'>

            <div className='col-sm'>
              <label htmlFor='country'>Payment: <span className='red'>*</span></label>
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
              {this.showInputs()}
              
            </div>
          </div>

          <div className='row'>
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

          {/* <div className='row'>
            <div className="col-sm">
              <label htmlFor='first_name'>First Name</label>
              <input
                className='form-control form-control-sm'
                type='text'
                placeholder='John'
                name="first_name"
                onChange={this.handleOnChange}/>

            </div>
            <div className="col-sm">

              <label htmlFor='last_name'>Last Name:</label>
              <input
                className='form-control form-control-sm'
                type='text'
                placeholder='Doe'
                name="last_name"
                onChange={this.handleOnChange}/>

            </div>

          </div>
          <div className='row'>
            <div className="col-sm">

              <label htmlFor='address'>Address:</label>
              <input
                className='form-control form-control-sm'
                type='text'
                placeholder='123 Street Rd'
                name="address"
                onChange={this.handleOnChange}/>

            </div>

          </div>
          <div className='row'>
            <div className="col-sm">

              <label htmlFor='city'>City/State:</label>
              <input
                className='form-control form-control-sm'
                type='text'
                placeholder='City/State'
                name="city"
                onChange={this.handleOnChange}/>

            </div>
            <div className="col-sm">

              <label htmlFor='zipcode'>Zip Code:</label>
              <input
                className='form-control form-control-sm'
                type='number'
                placeholder='1234'
                name="zipcode"
                onChange={this.handleOnChange}/>

            </div>

          </div> */}
          <div className='row'>
            <div className="col-sm">
              <Link to="/help">Need Help?</Link>
            </div>
            <div className="col-sm">
              <button className='btn btn-primary w-100' onClick={this.continue}>Continue</button>
            </div>

          </div>
        </form>
      </Fragment>
    );
  }
}

export default Registration;

import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Navbar from '../Home/Navbar';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import validator from 'validator'
export class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:'',
      first_name: '',
      last_name: '',
      address: '',
      city: '',
      zipcode: '',
      bank_account: '',
      bank_name: '',
      done: true,
      errors: [],
      refresh: false,
      noErrors: false,
      axiosError: '',
      isLoading:false
    }

    this.handleOnChange = this
      .handleOnChange
      .bind(this);
    this.handleOnSubmit = this
      .handleOnSubmit
      .bind(this);

  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    if(validator.isEmpty(event.target.value)){
      if(event.target.name === 'bank_account' || event.target.name === 'bank_name'){
        return
      }else{
        if(!this.state.errors.includes(`empty ${event.target.id}`)){
          this.state.errors.push(`empty ${event.target.id}`)
        }
        if(this.state.errors.includes(`invalid ${event.target.id}`)){
          this.state.errors = this.state.errors.filter(item => item !== `invalid ${event.target.id}`)
        }
      }
    }else{
      if(this.state.errors.includes(`empty ${event.target.id}`)){
        this.state.errors = this.state.errors.filter(item => item !== `empty ${event.target.id}`)
      }
    }
  }

  handleOnSubmit = (event) => {
    event.preventDefault();

    const {
      id,
      first_name,
      last_name,
      address,
      city,
      zipcode,
      bank_account,
      bank_name,
      done
    } = this.state;
    const data = {
      id,
      first_name,
      last_name,
      address,
      city,
      zipcode,
      bank_account,
      bank_name,
      done
    }
    
      axios({
        url:'/finishsignup',
        method:'post',
        data,
        withCredentials:true
      })
      .then(res => {
        window.parent.location = '/create-campaign'
      }).catch(err => {
        console.log(err.response.data)
        err.response.data.map(item => this.state.errors.push(item))
        this.setState({
          isLoading:true
        })
      })
  }
  render() {
    return(
<LoggedInContext.Consumer>{(context)=>{
  this.state.id = context.id
      return (
      <Fragment>
        <Navbar/>
        <main>
          <div className='container'>
          {(this.state.errors.length > 0)
          ? <div className="alert alert-danger" role="alert">{this
                .state
                .errors
                .map(error => (
                  <div key={error.id}>{error}</div>
                ))}</div>
          : ''}
            <form onSubmit={this.handleOnSubmit}>
              <label htmlFor='country'>Bank (optional):</label>
              <span
                className="d-inline-block"
                data-toggle="tooltip"
                title='insert tooltip for bank'>
                <img
                  src="https://img.icons8.com/material-rounded/18/000000/help.png"
                  alt='help-icon'/>
              </span>

              <input
                className='form-control form-control-sm mb-3'
                type='text'
                placeholder='Bank Name'
                name="bank_name"
                value={this.state.bank_name}
                onChange={this.handleOnChange}/>

              <input
                className='form-control form-control-sm mb-2'
                type='text'
                placeholder='Bank Account'
                name="bank_account"
                value={this.state.bank_account}
                onChange={this.handleOnChange}/>
              <div className='row'>
                <div className="col-sm">
                  <label htmlFor='first_name'>First Name</label>
                  <input
                    className='form-control form-control-sm'
                    type='text'
                    placeholder='John'
                    name="first_name"
                    id='First Name'
                    onChange={this.handleOnChange}/>

                </div>
                <div className="col-sm">

                  <label htmlFor='last_name'>Last Name:</label>
                  <input
                    className='form-control form-control-sm'
                    type='text'
                    placeholder='Doe'
                    name="last_name"
                    id='Last Name'
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
                    id='address'
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
                    id='city'
                    onChange={this.handleOnChange}/>

                </div>
                <div className="col-sm">

                  <label htmlFor='zipcode'>Zip Code:</label>
                  <input
                    className='form-control form-control-sm'
                    type='number'
                    placeholder='1234'
                    name="zipcode"
                    id='zipcode'
                    onChange={this.handleOnChange}/>

                </div>

              </div>
              <button>Finish</button>
            </form>
          </div>
        </main>
      </Fragment>
    );
    }}</LoggedInContext.Consumer>
    )
    
    
  }
}

export default PersonalInfo;

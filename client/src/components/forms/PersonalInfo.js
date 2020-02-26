import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {strapi, getId} from '../functions';
import Navbar from '../Home/Navbar';
import {Redirect} from 'react-router-dom';
import { LoggedInContext } from '../../contexts/LoggedInContext';
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
      axiosError: ''
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

    if (first_name.length > 0 && last_name.length > 0 && address.length > 0 && city.length > 0 && zipcode.length > 0) {

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
        console.log(err.response)
      })
    }
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

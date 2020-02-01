import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../components/Home/Navbar'
import PaypalButton from '../components/Home/PaypalButton';

export class Donation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      anonymous: false,
      amount: 1,
      campaign: this.props.match.params.id,
      donation_ref: 'donation' + Math.floor(Math.random() * 31415926),
      error: '',
      access_token: ''
    }


    this.handleOnChange = this
      .handleOnChange
      .bind(this)
    
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  render() {
    return (
      <Fragment>
        <Navbar/>
        <main>
          <div className='container'>
            <Link className='mb-3' to={`/campaign/${this.props.match.params.id}`} style={{display:'block'}}> Go back</Link>
            <form>
            {/* <form action='http://localhost:4000/pay' method='post'> */}
            <div className='row'>
            <div className='col-sm-6'>
            <div className='col-sm-12 mb-3'>
            <h4>First Name</h4>
            <input
              type='text'
              name='first_name'
              className='form-control'
              placeholder='First Name'
              onChange={this.handleOnChange}/>
            </div>
            <div className='col-sm-12 mb-3'>
            <h4>Last Name</h4>
            <input
              type='text'
              name='last_name'
              className='form-control'
              placeholder='Last Name'
              onChange={this.handleOnChange}/>
            </div>
            <div className='col-sm-12 mb-3'>
            <h4>Email</h4>
            <input
              type='text'
              name='email'
              className='form-control'
              placeholder='Email Name'
              onChange={this.handleOnChange}/>
            </div>
            <div className='col-sm-12 mb-3'>
            <h4>Donate Amount</h4>
            <input
              type='number'
              name='amount'
              value={this.state.amount}
              className='form-control'
              placeholder='Amount'
              onChange={this.handleOnChange}/>
            </div>
            <div className='col-sm-12 mb-3'>
            <input type='checkbox' className='form-check-input' name='anonymous'  onClick={this.handleOnClick}/>
            <label htmlFor='anonymous'>Hide name from everyone except for the admin</label>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='col-sm-12 mb-3'>
            <h4>Paypal</h4>
            <PaypalButton data={this.state} />
            </div>
          </div>
            </div>
            </form>
            
          </div>
          
        </main>
      </Fragment>
    );
  }
}

export default Donation;

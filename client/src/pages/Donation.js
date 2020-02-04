import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../components/Home/Navbar'
import PaypalButton from '../components/Home/PaypalButton';
import axios from 'axios';
import {strapi} from '../components/functions'
export class Donation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      first_name: '',
      last_name: '',
      email: '',
      anonymous: false,
      amount: 1,
      campaigns: {
        id: this.props.match.params.id
      },
      donation_ref: 'donation' + Math.floor(Math.random() * 31415926),
      currency:'USD',
      access_token: '',
      orderID: '',
      payerID: '',
      noError: false,
      errors: [],
      isLoading: false
    }

    this.handleOnChange = this
      .handleOnChange
      .bind(this)

  }

  componentDidMount(){
    axios.get(`${strapi}/campaigns/${this.props.match.params.id}`).then(res=>{
      this.setState({
        currency:res.data.currency
      })
    }).catch(err=>{console.log(err)})
  }

  saveTransaction = (data) => {
    this.setState({
      name: this.state.first_name + ' ' + this.state.last_name,
      payerID: data.payerID,
      orderID: data.orderID,
      donation:this.state.amount
    })
    console.log(this.state)
    const body = this.state
    axios
      .post(`${strapi}/supporters`, body)
      .then(res => {
        console.log(res.data)
        window.location.href=`/campaign/${this.props.match.params.id}`
      })
      .catch(err => {
        console.log(err.response.data.message)
      })
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  removeItem = (item) => {
    for (var i = 0; i < this.state.errors.length; i++) {
      if (this.state.errors[i] === item) {
        this
          .state
          .errors
          .splice(i, 1);
      }
    }
  }

  showPaypal = event => {

    event.preventDefault();
    this.setState({isLoading: true, noError: false})
    if (this.state.first_name.length > 0 && this.state.last_name.length > 0 && this.state.email.length > 0) {
      this.setState({noError: true, errors: []})
    } else {
      if (this.state.first_name.length <= 0) {
        if (!this.state.errors.includes('enter first name')) {
          this
            .state
            .errors
            .push('enter first name')
        }
        this.setState({isLoading: false})
      } else {
        this.removeItem('enter first name')
      }
      if (this.state.last_name.length <= 0) {
        if (!this.state.errors.includes('enter last name')) {
          this
            .state
            .errors
            .push('enter last name')
        }
        this.setState({isLoading: false})
      } else {
        this.removeItem('enter last name')
      }
      if (this.state.email.length <= 0) {
        if (!this.state.errors.includes('enter email')) {
          this
            .state
            .errors
            .push('enter email')
        }
        this.setState({isLoading: false})
      } else {
        this.removeItem('enter email')
      }
    }
  }

  render() {
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

            <Link
              className='mb-3'
              to={`/campaign/${this.props.match.params.id}`}
              style={{
              display: 'block'
            }}>
              Go back</Link>
            <form onSubmit={this.showPaypal}>
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
                    <input
                      type='checkbox'
                      className='form-check-input'
                      name='anonymous'
                      onClick={this.handleOnClick}/>
                    <label htmlFor='anonymous'>Hide name from everyone except for the admin</label>
                  </div>
                  <button className='btn btn-primary mb-3'>Submit</button>
                </div>
                <div className='col-sm-6'>
                  <div className='col-sm-12 mb-3'>
                    <h4>Paypal</h4>
                    <p>Click submit to show paypal buttons</p>
                    {this.state.noError
                      ? <PaypalButton data={this.state} saveTransaction={this.saveTransaction}/>
                      : null}
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

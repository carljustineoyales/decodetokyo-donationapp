import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../components/Home/Navbar'
import PaypalButton from '../components/Home/PaypalButton';
import axios from 'axios';
import {strapi} from '../components/functions'
import {withStyles} from '@material-ui/core/styles';
import {Grid,TextField,Button,InputAdornment} from '@material-ui/core';
const useStyles = theme => ({
  mainStyle:{
    margin:theme.spacing(14),
    height:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignContent:'center',
    
    [theme.breakpoints.down('md')]:{
      margin:theme.spacing(14,0,8,0),
    }
  },
  mb:{
    marginBottom:theme.spacing(8)
  }
})
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
      currency: '',
      access_token: '',
      orderID: '',
      payerID: '',
      noError: false,
      errors: [],
      isLoading: false,
      raised: 0
    }

    this.handleOnChange = this
      .handleOnChange
      .bind(this)

  }

  componentDidMount() {
    axios
      .get(`${strapi}/campaigns/${this.props.match.params.id}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          currency: res.data.currency,
          raised: Number(res.data.raised)
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  saveTransaction = (data) => {
    this.setState({
      name: this.state.first_name + ' ' + this.state.last_name,
      payerID: data.payerID,
      orderID: data.orderID,
      donation: this.state.amount
    })
    console.log(this.state)
    const {
      name,
      payerID,
      orderID,
      donation,
      email,
      campaigns
    } = this.state
   
    // const supporters = axios.post(`${strapi}/supporters`, body)
    const supporters = axios({
      url:'/supporters',
      method:'post',
      data:{
        name,
      payerID,
      orderID,
      donation,
      email,
      campaigns
      },
      withCredentials:true
    })
   
    // const updateCampaigns = axios.put(`${strapi}/campaigns/${this.props.match.params.id}`, raised)
    const updateCampaigns = axios({
      url:'/updatecampaign',
      method:'post',
      data:{
        id:this.props.match.params.id,
        raised:Number(this.state.raised) + Number(donation)
      },
      withCredentials:true
    })
    // .then(res=>{console.log(res)}).catch(err=>{console.log(err)})
    Promise
      .all([supporters, updateCampaigns])
      .then(res => {
        console.log(res)
        window.parent.location = `/campaign/${this.props.match.params.id}`
      })
      .catch(err => {
        console.log(err)
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
    console.log('showpaypal function')
  }

  render() {
    const {classes} =this.props
    return (
      <Fragment>
        <Navbar/>
        <main className={classes.mainStyle}>
        {(this.state.errors.length > 0)
              ? <div className="alert alert-danger" role="alert">{this
                    .state
                    .errors
                    .map(error => (
                      <div key={error.id}>{error}</div>
                    ))}</div>
              : ''}
             
{/*           
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
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <label className="input-group-text" for="amount">{this.state.currency}</label>
                      </div>
                      <input
                        id='amount'
                        type='number'
                        name='amount'
                        value={this.state.amount}
                        className='form-control'
                        placeholder='Amount'
                        onChange={this.handleOnChange}/>
                    </div>
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
            </form> */}
            <Link
              className={classes.mb}
              to={`/campaign/${this.props.match.params.id}`}
              >
              Go back</Link>
              <br/>
          <Grid container spacing={4}>
          
            <Grid container item md={6}>
            
              <form onSubmit={this.showPaypal} style={{width:'100%'}}>
              
              
                <TextField 
                  type='text'
                  name='first_name'
                  label='First Name'
                  variant='outlined'
                  required
                  fullWidth
                  onChange={this.handleOnChange}
                />
                <br/>
                <br/>
                <TextField 
                  type='text'
                  name='last_name'
                  label='Last Name'
                  variant='outlined'
                  required
                  fullWidth
                  onChange={this.handleOnChange}
                />
                <br/>
                <br/>
                
                <TextField 
                  type='email'
                  name='email'
                  label='Email'
                  variant='outlined'
                  required
                  fullWidth
                  onChange={this.handleOnChange}
                />
                <br/>
                <br/>
                <TextField 
                  id='amount'
                  type='number'
                  name='amount'
                  label='Amount'
                  variant='outlined'
                  required
                  fullWidth
                  onChange={this.handleOnChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{this.state.currency}</InputAdornment>,
                  }}
                /><br/>
                <br/>
                <Button type='submit' color='primary' variant='contained' fullWidth>Submit</Button>
              </form>
            </Grid>
            <Grid item md={6}>
              <h4>Paypal</h4>
              <p>Click submit to show paypal buttons</p>
              {this.state.noError
                ? <PaypalButton data={this.state} saveTransaction={this.saveTransaction}/>
                : null}
            </Grid>
          </Grid>
        </main>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(Donation);

import React, { Component } from 'react';
import Navbar from '../components/Home/Navbar';
import { Link} from 'react-router-dom';
import axios from 'axios';
import {strapi, getUserName,getId} from '../components/functions';
import NotFound from './NotFound'
export class CheckOut extends Component {
  //AFTER SENDING THE REQUEST DELETE THE CAMPAIGN
  constructor(props) {
    super(props);
    this.state={
      id:'',
      raised:0,
      title:'',
      currency:'',
      author:'',
      modeOfPayment:'',
      gcash:'',
      paypal:'',
      smartpadala:'',
      reference_id:'checkout-'+Math.floor(Math.random() * 31415926),
      email:'',
      name:'',
      user_id:'',
      requested:false
      
    }
    this.handeOnSubmit = this.handeOnSubmit.bind(this)
    this.showInput = this.showInput.bind(this)
  }

  handeOnSubmit = (event) => {
    event.preventDefault();
    this.setState({
      requested:true
    })
    const {id,reference_id,user_id,name,email,modeOfPayment,raised,currency} = this.state
    const data = {
      reference_id,
      campaign_id:id,
      user_id,
      name,
      email,
      mode_of_payment:modeOfPayment,
      amount:raised,
      currency,}
    axios.post(`${strapi}/checkout-requests`,data)
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=>{
      alert('You Already Requested a Checkout')
    })
    const requested = {
      requested:true
    }
    axios.put(`${strapi}/campaigns/${this.props.match.params.id}`,requested)
    .then(res=>{console.log(res)})
    .catch(err=>{console.log(err)})
    
  }

  handleOnChange =  event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  showInput = () => {
    switch(this.state.modeOfPayment){
      case 'gcash':
        return(<input type='text' name='gcash' value={this.state.gcash} onChange={this.handleOnChange} placeholder='gcash'/>);
      case 'paypal':
        return(<input type='email' name='paypal' value={this.state.paypal} onChange={this.handleOnChange} placeholder='paypal'/>);
      case 'smartpadala':
        return(<input type='text' name='smartpadala' value={this.state.smartpadala} onChange={this.handleOnChange} placeholder='smartpadala'/>);
      default:
        return('');
    }
  }

  componentDidMount(){
    axios.get(`${strapi}/campaigns/${this.props.match.params.id}`).then(res=>{
      console.log(res.data)
        this.setState({
          raised:res.data.raised,
          id:res.data.id,
        title:res.data.title,
        currency:res.data.currency,
        author:res.data.author.username,
        name:res.data.author.first_name + ' ' + res.data.author.last_name,
        email:res.data.author.email,
        user_id:res.data.author.id,
        gcash:res.data.author.gcash_number,
        paypal:res.data.author.paypal_email,
        })
     
    }).catch(err=>{console.log(err)})
    
    axios.get(`${strapi}/users/${getId()}`)
      .then(res=>{
        console.log(res.data)
        this.setState({
          paypal:res.data.paypal_email,
          gcash:res.data.gcash_number
        })
      })
      .catch(err=>{
        console.log(err.response)
      })
  }
  
  render() {
    const {id,raised,title,currency,author} = this.state
    if(author === getUserName()){
      return (
        <div>
          <Navbar/>
          <main>
            <div className='container'>
            <Link to={`/campaign/${id}`}>Go Back</Link>
              <h1>Checkout</h1>
              <p>{title}</p>
              <p>{currency} {raised}</p>
              <form onSubmit={this.handeOnSubmit}>
                <select name='modeOfPayment' onChange={this.handleOnChange}>
                  <option value=''>Checkout Option</option>
                  <option value='gcash'>GCASH</option>
                  <option value='paypal'>PayPal</option>
                  <option value='smartpadala'>Smart Padala</option>
                </select>
                {this.showInput()}
                <button>Request Check Out</button>
              </form>
            </div>
          </main>
        </div>
      );
    }else{
      return(
        <NotFound/>
      )
    }
    
  }
}

export default CheckOut;

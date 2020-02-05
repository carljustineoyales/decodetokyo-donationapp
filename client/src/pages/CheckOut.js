import React, { Component } from 'react';
import Navbar from '../components/Home/Navbar';
import { Link, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import {strapi, getUserName} from '../components/functions';
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
      author:''
    }
    this.handeOnSubmit = this.handeOnSubmit.bind(this)
  }

  handeOnSubmit = (event) => {
    event.preventDefault();
    console.log('clicked')
  }

  componentDidMount(){
    axios.get(`${strapi}/campaigns/${this.props.match.params.id}`).then(res=>{
      console.log(res.data)
      res.data.supporters.map(supporter=>{
        this.state.raised += supporter.donation
      })
      this.setState({
        id:res.data.id,
        title:res.data.title,
        currency:res.data.currency,
        author:res.data.author.username
      })
    }).catch(err=>{console.log(err)})
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
                <select>
                  <option>Checkout Option</option>
                  <option>GCASH</option>
                  <option>PayPal</option>
                  <option>Smart Padala</option>
                </select>
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

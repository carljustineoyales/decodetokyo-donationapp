import React, { Component } from 'react';
import CheckOutItem from './CheckOutItem';
import axios from 'axios';
import {strapi} from '../functions'
export class CheckOutTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      error: ''
    }
  }
  

  componentDidMount(){
    axios.get(`${strapi}/checkout-requests`)
    .then(res=>{
      console.log(res.data)
      this.setState({
        items:res.data
      })
    })
    .catch(err=>{
      console.log(err.response)
    })
  }

  render() {
    const {items} = this.state
    return (
      
       <div>
        <h2>Checkout Request</h2>
        <p>This table shows Checkout Request</p>
        <input type='text' placeholder='search'/>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Ref. ID</th>
              <th>Acount Owner</th>
              <th>Acount Email</th>
              <th>Campaign ID</th>
              <th>Mode of Payment</th>
              <th>Amount</th>
              <th>Request Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {items.map(item=>(<CheckOutItem key={item.id} item={item}/>))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
        
      
    );
  }
}

export default CheckOutTable;

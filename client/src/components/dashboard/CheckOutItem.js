import React, { Component, Fragment } from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom'
import axios from 'axios';
import {strapi} from '../functions'

export class CheckOutItem extends Component {
  
//add approve checkout
  decline = () => {
    let data = {
      requested:false
    }
    
    // axios.put(`${strapi}/campaigns/${this.props.item.campaign_id}`,{
    //   headers:{
    //     'Cookie':'access_token'
    //   }
    // },data)
    axios({
      url:'/declinecheckout',
      method:'post',
      data:{
        requested:false,
        id:this.props.item.campaign_id
      },
      withCredentials:true
    })
    .then(res=>{
      console.log(res)
      axios.delete(`${strapi}/checkout-requests/${this.props.item.id}`)
      .then(res=>{console.log(res)})
      .catch(err=>{console.log(err)})
    })
    .catch(err=>{
      console.log(err)
    })
  }
  
  render() {
    const {campaign_id,reference_id,username,mode_of_payment,amount,currency,created_at,name,email} = this.props.item
    return (
      <Fragment>
        <tr>
          <td>{reference_id}</td>  
          <td><Link to={`/profile/${username}`}>{name}</Link></td>  
          <td>{email}</td>  
          <td>{campaign_id}</td>  
          <td>{mode_of_payment}</td>  
          <td>{currency}{amount}</td>  
          <td><Moment>{created_at}</Moment></td>  
          <td>
              <button className='btn btn-success'>&#10004;</button>
              <button className='btn btn-danger' onClick={this.decline}>&#10006;</button>
          </td>
        </tr>
      </Fragment>
    );
  }
}

export default CheckOutItem;

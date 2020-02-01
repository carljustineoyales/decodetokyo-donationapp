import React, { Component } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import axios from 'axios';
import {strapi} from '../functions'
export class PaypalButton extends Component {

  render() {
    return (
      <PayPalButton
      
      // amount={this.props.data.amount}
      //add currency later
      amount={this.props.data.amount}
      shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
      onSuccess={(details, data) => {
        alert("Transaction completed by " + details.payer.name.given_name);
        
        // OPTIONAL: Call your server to save the transaction
        const bundle ={
          data,
          props:this.props
          
        }
        console.log(this.props)
        axios(`/pay`, {
          method: "post",
          headers:{
            'content-type':'application/json'
          },
          data:bundle
          
        }).then(res=>{console.log(res.data)}).catch(err=>{console.log(err.response.data.message)});
      }}
      onError={(details,data)=>{
        return console.log(this.props.data.amount)
      }}
      //Live
      // options={{
      //   clientId:'AR-jE0wPMfdmAfZU764-f3N5oIRZtA5ZZt7r6jOuhVvOk3YbE2TkN6h-NWikJZIV26do7GlJ2nOiWHMS'
      // }}
      //SB
      options={{
        clientId:'AS6JEMGNuFRUZWDJuUY4oAhyiX09neZKjhHV8XODfrSWfyDkVWEV8s0PedFQ-8Q9i8OpjJmJ-AlDsQlv'
      }}
    />
    );
  }
}

export default PaypalButton;

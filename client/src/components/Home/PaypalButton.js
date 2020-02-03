import React, { Component } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
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
        this.props.saveTransaction(data);
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

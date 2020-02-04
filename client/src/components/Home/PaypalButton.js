import React, { Component } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
export class PaypalButton extends Component {

  render() {
    console.log(this.props.data.currency)
    return (
      <PayPalButton
      amount={this.props.data.amount}
      shippingPreference="NO_SHIPPING" 
      onSuccess={(details, data) => {
        alert("Transaction completed by " + details.payer.name.given_name);
        this.props.saveTransaction(data);
        
      }}
      onError={(details,data)=>{
        return console.log(details)
      }}
      //Live
      // options={{
      //   clientId:'AR-jE0wPMfdmAfZU764-f3N5oIRZtA5ZZt7r6jOuhVvOk3YbE2TkN6h-NWikJZIV26do7GlJ2nOiWHMS',
      //   currency:this.props.data.currency
      // }}
      //SB
      options={{
        clientId:'AS6JEMGNuFRUZWDJuUY4oAhyiX09neZKjhHV8XODfrSWfyDkVWEV8s0PedFQ-8Q9i8OpjJmJ-AlDsQlv',
        currency:this.props.data.currency
      }}
    />
    );
  }
}

export default PaypalButton;

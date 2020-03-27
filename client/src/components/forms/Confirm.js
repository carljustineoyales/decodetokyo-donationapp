import React, { Component } from 'react';
import {List, ListItemText, Button} from '@material-ui/core'
class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.handleOnSubmit();
    this.props.nextStep();
  }
  prev = e => {
    e.preventDefault();
    this.props.prevStep();
  }
  render() {
    const {values:{
      first_name,
      last_name,
      address,
      city,
      addressState,
      zipcode,
      bank_account,
      bank_name,
      account_name,
      paypal_email,
      gcash_number
    }, handleOnChange} = this.props
    return (
      
      <>
      <List>
      <ListItemText primary="First Name" secondary={first_name} />
      <ListItemText primary="Last Name" secondary={last_name} />
      <ListItemText primary="Address" secondary={address} />
      <ListItemText primary="City" secondary={city} />
      <ListItemText primary="State" secondary={addressState} />
      <ListItemText primary="Zip Code" secondary={zipcode} />
      <ListItemText primary="Bank Account" secondary={bank_account} />
      <ListItemText primary="Bank Name" secondary={bank_name} />
      <ListItemText primary="Account Name" secondary={account_name} />
      <ListItemText primary="Paypal Email" secondary={paypal_email} />
      <ListItemText primary="Gcash Number" secondary={gcash_number} />
      </List>
      <Button color='primary' variant='contained' onClick={this.prev}>Back</Button>
      <Button color='primary' variant='contained' onClick={this.continue}>Continue</Button>
            </>
          
    );
  }
}

export default Confirm;

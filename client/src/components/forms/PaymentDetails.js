import React, { Component } from 'react';
import {TextField, AppBar, MuiThemeProvider, Button} from '@material-ui/core'

class PaymentDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }
  prev = e => {
    e.preventDefault();
    this.props.prevStep();
  }
  render() {
    const {values, handleOnChange} = this.props
    return (
      <div>
        <TextField
        label='Bank Name'
        
        name='bank_name'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.bank_name}
      />
      <TextField
        label='Bank Account'
        
        name='bank_account'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.bank_account}
      />
      <TextField
        label='Account Name'
        
        name='account_name'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.account_name}
      />
      <TextField
        label='Paypal Email'
        
        name='paypal_email'
        variant='outlined'
        helperText='you can leave this blank if you have gcash number'
        onChange={handleOnChange}
        defaultValue={values.paypal_email}
      />
      <TextField
        label='GCash No.'
        
        name='gcash_number'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.gcash_number}
      />
      <Button color='primary' variant='contained' onClick={this.prev}>Back</Button>
      <Button color='primary' variant='contained' onClick={this.continue}>Continue</Button>
      </div>
    );
  }
}

export default PaymentDetails;

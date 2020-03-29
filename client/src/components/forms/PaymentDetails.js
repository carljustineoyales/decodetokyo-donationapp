import React, { Component } from 'react';
import {TextField,Button, Grid, Divider} from '@material-ui/core'
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
      <>
      <Grid container item  spacing={2} direction='row' justify='center' alignContent='center' xs={12}>
      <Grid item xs={6}>
      <TextField
        label='Bank Name'
        fullWidth
        name='bank_name'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.bank_name}
      />
      </Grid>
      <Grid item xs={6}>
      <TextField
        label='Bank Account'
        fullWidth
        name='bank_account'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.bank_account}
      />
      </Grid>
      <Grid item xs={12}>
      <TextField
        label='Account Name'
        fullWidth
        name='account_name'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.account_name}
      />
      </Grid>
      <Grid item xs={12}>
      
      <Divider/>
      <br/>
      <TextField
        label='Paypal Email'
        fullWidth
        name='paypal_email'
        variant='outlined'
        helperText='leave this blank if you live in the Philippines'
        onChange={handleOnChange}
        defaultValue={values.paypal_email}
      />
      </Grid>
      <Grid item xs={12}>
      <Divider/>
      <br/>
      <TextField
        label='GCash No.'
        fullWidth
        name='gcash_number'
        variant='outlined'
        helperText='Provide Gcash no., Philippine residence only'
        onChange={handleOnChange}
        defaultValue={values.gcash_number}
      />
      </Grid>
      <Grid container item xs={6} justify='flex-start'>
      <Button color='primary' variant='outlined' onClick={this.prev}>Back</Button>

      </Grid>
      <Grid container item xs={6} justify='flex-end'>
      <Button color='primary'  variant='contained' onClick={this.continue}>Continue</Button>

      </Grid>
        
      
     
      
      
      </Grid>
      </>
    );
  }
}

export default PaymentDetails;

import React, { Component } from 'react';
import {TextField,Button, Grid, Divider, Hidden} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'
const useStyles = theme => ({
  btn:{
    [theme.breakpoints.down('sm')]:{
      width:'100%'
    }
  }
})
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
    const {classes} = this.props
    return (
      <>
      <Grid container item  spacing={2} direction='row' justify='center' alignContent='center' md={12}>
      <Grid item md={6} xs={12}>
      <TextField
        label='Bank Name'
        fullWidth
        name='bank_name'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.bank_name}
      />
      </Grid>
      <Grid item md={6} xs={12}>
      <TextField
        label='Bank Account'
        fullWidth
        name='bank_account'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.bank_account}
      />
      </Grid>
      <Grid item md={12} xs={12}>
      <TextField
        label='Account Name'
        fullWidth
        name='account_name'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.account_name}
      />
      </Grid>
      <Grid item md={12} xs={12}>
      
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
      <Grid item md={12} xs={12}>
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
      <Hidden mdUp>
      <Grid container item md={6} xs={12} justify='flex-end'>
      <Button color='primary'  variant='contained' className={classes.btn} onClick={this.continue}>Continue</Button>

      </Grid>
      </Hidden>
      <Grid container item md={6} xs={12} justify='flex-start'>
      <Button color='primary' variant='outlined' className={classes.btn} onClick={this.prev}>Back</Button>

      </Grid>
      <Hidden smDown>
      <Grid container item md={6} xs={12} justify='flex-end'>
      <Button color='primary'  variant='contained' className={classes.btn} onClick={this.continue}>Continue</Button>

      </Grid>
      </Hidden>
        
      
     
      
      
      </Grid>
      </>
    );
  }
}

export default withStyles(useStyles)(PaymentDetails);

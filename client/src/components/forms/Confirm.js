import React, { Component } from 'react';
import { Button,Typography,Grid,Divider} from '@material-ui/core'
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
      gcash_number,
      country
    }, handleOnChange} = this.props
    return (
      
      <>
      {/* <List>
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
      <Button color='primary' variant='contained' onClick={this.continue}>Continue</Button> */}
      <Grid container item  spacing={2} direction='row' justify='center' alignContent='center' xs={12}>
      <Grid item xs={6}>
      <Typography color='primary' variant='h5'>First Name</Typography>
      <Typography>{first_name}</Typography>
      </Grid>
      <Grid item xs={6}>
      <Typography color='primary' variant='h5'>Last Name</Typography>
      <Typography>{last_name}</Typography>
      </Grid>
      <Grid item xs={12}>
      <Typography color='primary'>Address</Typography>
      <Typography>{address} {city} {addressState} {country} {zipcode}</Typography>
      <br/>
      <Divider/>
      <br/>
      </Grid>
      <Grid item xs={6}>
      
      <Typography color='primary' variant='h5'>Bank Name</Typography>
      <Typography>{bank_name}</Typography>
      </Grid>
      <Grid item xs={6}>
      <Typography color='primary' variant='h5'>Bank Account</Typography>
      <Typography>{bank_account}</Typography>
      </Grid>
      <Grid item xs={12}>
      <Typography color='primary' variant='h5'>Account Name</Typography>
      <Typography>{account_name}</Typography>
      </Grid>
      <Grid item xs={12}>
      <Divider/>
      <br/>
      <Typography color='primary' variant='h5'>Paypal Email</Typography>
      <Typography>{paypal_email}</Typography>
      </Grid>
      <Grid item xs={12}>
      <Typography color='primary' variant='h5'>Gcash No.</Typography>
      <Typography>{gcash_number}</Typography>
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

export default Confirm;

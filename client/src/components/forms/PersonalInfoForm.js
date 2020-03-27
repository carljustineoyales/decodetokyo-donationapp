import React, { Component } from 'react';
import {TextField, AppBar, MuiThemeProvider, Button} from '@material-ui/core'
class PersonalInfoForm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }
  render() {
    const {values, handleOnChange} = this.props
    return (
      
      <>
      
      <TextField
        label='First Name'
        required
        name='first_name'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.first_name}
      />
      <TextField
        label='Last Name'
        required
        name='last_name'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.last_name}
      />
      <TextField
        label='Address'
        required
        name='address'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.address}
      />
      <TextField
        label='City'
        required
        name='city'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.city}
      />
      <TextField
        label='State'
        required
        name='addressState'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.addressState}
      />
      <TextField
        label='Zip Code'
        required
        name='zipcode'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.zipcode}
      />
      <TextField
        label='Country'
        required
        name='country'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.country}
      />
      <Button color='primary' variant='contained' onClick={this.continue}>Continue</Button>
      
            </>
          
    );
  }
}

export default PersonalInfoForm;

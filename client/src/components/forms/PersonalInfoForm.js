import React, { Component } from 'react';
import {TextField,Button, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
const useStyles = theme => ({
  btngrid:{
    display:'flex',
    justifyContent:'flex-end',
    // [theme.breakpoints.down('sm')]:{
    //   justifyContent:'center',
      
    // }
  },
  btn:{
    [theme.breakpoints.down('sm')]:{
      width:'100%'
    }
    
  }
})
class PersonalInfoForm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }
  render() {
    const {values, handleOnChange} = this.props
    const {classes} = this.props
    return (
      
      <>
      <form onSubmit={this.continue}>
      <Grid container item  spacing={2} direction='row' justify='center' alignContent='center' md={12} >
      
      <Grid item md={6} xs={12}>
      <TextField
        label='First Name'
        required
        fullWidth
        name='first_name'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.first_name}
      />
      </Grid>
      <Grid item md={6} xs={12}>
      <TextField
        label='Last Name'
        required
        fullWidth
        name='last_name'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.last_name}
      />
      </Grid>
      <Grid item md={12} xs={12}>
      <TextField
        label='Address'
        required
        fullWidth
        name='address'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.address}
      />
      </Grid>
      <Grid item md={4} xs={12}>
      <TextField
        label='City'
        required
        fullWidth
        name='city'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.city}
      />
      </Grid>
      <Grid item md={4} xs={12}>
      <TextField
        label='State'
        required
        fullWidth
        name='addressState'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.addressState}
      />
      </Grid>
      <Grid item md={4} xs={12}>
      <TextField
        label='Zip Code'
        required
        fullWidth
        name='zipcode'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.zipcode}
      />
      </Grid>
      <Grid item md={12} xs={12}>
      <TextField
        label='Country'
        required
        fullWidth
        name='country'
        variant='outlined'
        onChange={handleOnChange}
        defaultValue={values.country}
      />
      </Grid>
      <Grid item md={12} xs={12} className={classes.btngrid}>
      <Button color='primary' variant='contained' className={classes.btn}   type='submit' >Continue</Button>
      
      </Grid>
      

     </Grid>
     </form>
      
      
      
      
      
      
      
            </>
          
    );
  }
}

export default withStyles(useStyles)(PersonalInfoForm);

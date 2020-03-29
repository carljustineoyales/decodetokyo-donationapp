import React, { Component } from 'react';
import Navbar from '../components/Home/Navbar';
import { Link } from 'react-router-dom';
import { LoggedInContext } from '../contexts/LoggedInContext';
import {withStyles} from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = theme => ({
  mainStyle:{
    margin:theme.spacing(14),
    height:'auto',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  headeing1:{
    fontSize:'32px'
  }
})
export class Success extends Component {
  
  render() {
    const {classes} = this.props
    return (
      <LoggedInContext.Consumer>{(context)=>{
        return(
          <div>
        <Navbar/>
        <main className={classes.mainStyle}>
          
      <Typography variant='h4' color='primary'>Success</Typography>
      <Typography variant='body1'>Please wait 2-3 days for verification</Typography>
      <Typography variant='body1'>click {context.loggedin ? <Link to={'/feed'}>here</Link> : <Link to={'/'}>here</Link>} to go to feed</Typography>
          
       
        </main>
      </div>
        )
      }}</LoggedInContext.Consumer>
      
    );
  }
}

export default withStyles(useStyles)(Success);

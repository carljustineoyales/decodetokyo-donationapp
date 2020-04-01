import React, {Component, Fragment} from 'react';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';
import UserForm from './UserForm';
import Feed from './Feed';
import {withToken} from '../components/functions'
import About from '../components/Home/About';
import { Redirect } from 'react-router-dom';
import { RegistrationContext } from '../contexts/RegistrationContext';
import { LoggedInContext } from '../contexts/LoggedInContext';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper ,Hidden} from '@material-ui/core';
import { CardListContext } from '../contexts/CardListContext';

const useStyles = theme => ({
  mainStyle:{
    overflow:'hidden',
    margin:theme.spacing(10,2,10,2),
    height:'auto',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    [theme.breakpoints.up('md')]:{
      height:'100vh',
      margin:theme.spacing(3),
    }
  },
  paperStyle:{
    padding:theme.spacing(1),
    background:'transparent',
    
  },
  flexGrid:{
    display:'flex',
    justifyContent:'space-evenly',
    alignItems:'center',
    [theme.breakpoints.down('sm')]:{
      justifyContent:'flex-start'
    }
  }
})

export class Home extends Component {

  render() {
    const { classes } = this.props;
    return(
<LoggedInContext.Consumer>{(LoggedInContext)=>{
      const {loggedin} = LoggedInContext
      if(loggedin){
  return (
      <Redirect to={`/feed`}/>
  )
}else{
  return (
    <RegistrationContext.Consumer>{(context) => {
      //add cardlist context form the dynamic number in the about section
      return( 
        <CardListContext.Consumer>{(context)=>{
          console.log(context)
          return (
            <>
        <Navbar/>
      <main className={classes.mainStyle}>
        
        <Grid container spacing={2} className={classes.flexGrid}
        >
        
        <Grid item lg={6} md={6} sm={12}>
            <About cards={context.cards} />
          </Grid>
          
          <Grid container item lg={4} md={6} sm={12}>
         
            <UserForm/>
          </Grid>
        </Grid>
          
        
      </main>
      <Footer/>
      </>
          )
        }}</CardListContext.Consumer>
        
      )
    }
    }
      
      </RegistrationContext.Consumer>
    );
   
}
    
  }}</LoggedInContext.Consumer>
    )
    
  
      
      
    
  }
}

export default withStyles(useStyles)(Home);

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
    margin:'100px 64px',
    height:'auto',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  paperStyle:{
    padding:theme.spacing(1),
    background:'transparent',
    
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
        
        <Grid container spacing={2} direction="row"
  justify="space-evenly"
  alignItems="center"
  alignContent='center'>
        
        <Grid item xl={6} md={6}>
            <About cards={context.cards} />
          </Grid>
          
          <Grid container item xl={4} md={6}>
         
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

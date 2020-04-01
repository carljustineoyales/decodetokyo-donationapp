import React, {Component, Fragment} from 'react';

import {Redirect, Link} from 'react-router-dom';
import {withToken,getdone} from '../components/functions'
import Navbar from '../components/Home/Navbar'

import Login from '../components/Home/Login';
import { LoggedInContext } from '../contexts/LoggedInContext';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';

const useStyles = theme => ({
  mainStyle:{
    width:'100vw',
    height:'100vh',
    margin:'0',
    [theme.breakpoints.down('md')]:{
      display:'flex',
     justifyContent:'center',
     alignContent:'center',
     height:'100vh',
    
    }
  },
  paperStyleBackground:{
    background: 'rgb(0,152,131)',
    background: 'linear-gradient(-45deg, rgba(0,152,131,1) 0%, rgba(0,192,99,1) 100%)',
    borderRadius:'0',
    height:'100vh',
    display:'flex',
    flowDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    color:'#fff',
    textAlign:'center'
  },
  paperStyle:{
    background:'white',
    borderRadius:'0',
    
  },
  linkStyle:{
    color:'#fff',
    "&:hover": {
      textDecoration:'none',
      color:'#fff',
    }
  }
})
export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      loggedin:false,
      done:false
    }
  }
  
  render() {
    const { classes } = this.props;
    console.log(this.props)
    if (this.state.loggedin) {
      if(this.state.done){
        return (<Redirect to={`/personalinfo`}/>)
      }else{
        return (<Redirect to={`/feed`}/>)
        
      }
      
    } else {
      return (
        <LoggedInContext.Consumer>{(context)=>{
          const { handleOnSuccess,id,loggedin,done} = context;
          this.state.loggedin = loggedin;
          this.state.done = done;
          return(
            <Fragment>
            <Hidden lgUp>
          <Navbar/>
          </Hidden>
          <main className={classes.mainStyle}>
            
              <Grid container>
              <Hidden mdDown>
                <Grid item lg={6} className={classes.paperStyleBackground}>
                  <div>
                  <h1><Link className={classes.linkStyle} to={'/'}>Logo</Link></h1>
                  <h4>Share and Donate</h4>
                  </div>
                </Grid>
                
                </Hidden>
                <Grid container item lg={6} md={12} sm={8} direction='row' justify='center' alignContent='center'>
                  <Login handleOnSuccess={handleOnSuccess} id={id}/> 
                  
                  
                </Grid>
                  
                
              </Grid>
              

            
          </main>

        </Fragment>
          )
        }}

        </LoggedInContext.Consumer>
        
      );
    }

  }
}

export default withStyles(useStyles)(LoginPage);

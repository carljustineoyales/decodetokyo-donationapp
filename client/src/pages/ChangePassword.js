import React, { Component } from 'react';
import axios from 'axios';
import {strapi} from '../components/functions'
import Navbar from '../components/Home/Navbar';
import {withStyles} from '@material-ui/core/styles';
import {Redirect, Link} from 'react-router-dom';
import {Grid, TextField,Button, Typography,Hidden} from '@material-ui/core';

const useStyles = theme => ({
  mainStyle:{
    width:'100vw',
    height:'100vh',
    margin:'0',
    [theme.breakpoints.down('md')]:{
      display:'flex',
     justifyContent:'center',
     alignContent:'center',
     alignItems:'center',
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
export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state={
      email:'',
      isSuccess:false
    }
    this.hanldeOnSubmit = this.hanldeOnSubmit.bind(this);
    // this.hanldeOnChange = this.hanldeOnChange.bind(this);
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  hanldeOnSubmit = (event) =>{
    const {email} = this.state
    event.preventDefault();

  
    axios({
      url:'/changepassword',
      method:'post',
      data:{
        email,
      }

    })
    .then(res=>{
      this.setState({
        isSuccess:true
      })
    })
    .catch(err=>{
      // console.log(err.response.data.message[0].messages[0].message)
      alert(err.response.data.message[0].messages[0].message)
    })
  }
  
  
  
  render() {
    const {classes} = this.props
    const {isSuccess} = this.state
    if (isSuccess) {
      return (
        <>
         <main className={classes.mainStyle}>
         <Hidden lgUp>
            <Navbar/>
            </Hidden>
            <Grid container>
            <Hidden mdDown>
              <Grid item xs={6} className={classes.paperStyleBackground}>
                <div>
                <h1><Link className={classes.linkStyle} to={'/'}>Logo</Link></h1>
                  <h4>Share and Donate</h4>
                </div>
              </Grid>
              </Hidden>
              
              <Grid container item md={6} xs={12} direction='row' justify='center' alignContent='center'>
                {/* <Login handleOnSuccess={handleOnSuccess} id={id}/>  */}
                <Typography variant='h1' style={{margin:'32px',fontSize:'32px'}}>
                You will receive an email to reset your password in a few minutes. Thank you!
                </Typography>
                
              </Grid>
                
              
            </Grid>
            

          
        </main>
      
           
        
        </>
      );
    } else {
      return (
        <>
       
            {/* <div className='container'>
            <form onSubmit={this.hanldeOnSubmit}>
        <label>Email</label><br/>
        <input type='email' name='email' onChange={this.handleOnChange}/><br/><br/>
          <button>Reset Password</button>
        </form>
          
            </div> */}
            <Hidden lgUp>
            <Navbar/>
            </Hidden>
            
            <main className={classes.mainStyle}>
            
              <Grid container>
              <Hidden mdDown>
                <Grid item xs={6} className={classes.paperStyleBackground}>
                  <div>
                  <h1><Link className={classes.linkStyle} to={'/'}>Logo</Link></h1>
                  <h4>Share and Donate</h4>
                  </div>
                </Grid>
                </Hidden>
                
                <Grid container item lg={6} md={12} sm={8} direction='row' justify='center' alignContent='center'>
                <form onSubmit={this.hanldeOnSubmit} style={{width:'50%'}}>
        <Typography>
          Enter your email to reset your password
          <br/><br/>
        </Typography>
        <TextField variant='outlined' label='Email' fullWidth type='email' name='email' onChange={this.handleOnChange}/><br/><br/>
          <Button variant='contained' color='primary' fullWidth type='submit'>Reset Password</Button>
        </form>
                  
                  
                </Grid>
                  
                
              </Grid>
              

            
          </main>
        
        </>
      );
    }
    
  }
}

export default withStyles(useStyles)(ChangePassword);

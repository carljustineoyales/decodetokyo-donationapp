import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import {strapi, withToken} from '../functions'
import { LoggedInContext } from '../../contexts/LoggedInContext';
import { Grid, TextField, Button, Paper, Typography } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'
// import { bake_cookie } from 'sfcookies'; 
const useStyles = theme => ({
  
  mb:{
    marginBottom:'5em'
  },
  formMb:{
    marginBottom:'2em'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    background: '#E5F6F1',
    borderColor:'#009883',

  },
})

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      loggedin: false,
      Loading: false,
      error: ''
    };
  }

  logInUser=()=>{
    const loginData = {
      identifier: this.state.username,
      password: this.state.password
    }
    axios
        .post(`/auth/login`, loginData)
        .then(res => {
          console.log(res)
          this.props.handleOnSuccess(res.data)
          
        })
        .catch(err =>{ 
          console.log(err.response.data)
          // let errId = err.response.data.message[0].messages[0].id
          // console.log(err.response.data.message[0].messages[0].id)
          // if(errId === 'Auth.form.error.confirmed'){
          //   <Redirect to={'/resendemailverification'}/>
          this.setState({
            error:err.response.data.message[0].messages[0].id
          })}
          // }
        )

  }

  onFormSubmit=(event)=> {
    console.log('form submit');
    event.preventDefault();
    this.logInUser();
  }

  handleOnChange=(event)=> {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  render() {
    const { classes } = this.props;
    return(
<LoggedInContext.Consumer>{(context)=>{
    this.state.loggedin = context.loggedin
    const {username, password} = this.state;
    if(this.state.error === 'Auth.form.error.confirmed'){
      return (<Redirect to={'/resendemailverification'}/>)
    }
  else if (this.state.loggedin) {
    return (<Redirect to={`/feed`}/>)
  } else {
    return (
      <Fragment>
      <Grid container item direction='column' justify='center' xs={6}>
      {(this.state.error === "Auth.form.error.invalid") ? (<div>Identifier or password invalid.</div>):((this.state.error === "Auth.form.error.email.provide") ? (<div>Please provide your username or your e-mail.</div>) : '')}
      <Grid item className={classes.mb}>
        <h1>Welcome</h1>
        </Grid>
        
        <form onSubmit={this.onFormSubmit} style={{width:'100%'}}>
        <Grid item container xs={12} className={classes.mb}>
        
        
        
        {/* <div >
        <input
                  type='text'
                  className='form-control form-control-sm w-100'
                  name='username'
                  placeholder='Username'
                  value={username}
                  onChange={this.handleOnChange}/>
        </div>
        <div >
        <input
                  type='password'
                  className='form-control form-control-sm w-100'
                  name='password'
                  placeholder='Password'
                  value={password}
                  onChange={this.handleOnChange}/>
                  <Link to={"/forgot-password"}>Forgot Password?</Link>
        </div>
        <div >
        <button className='btn btn-primary btn-sm w-100' type='submit'>Login</button>
        </div> */}
        
        <Grid item xs={12} className={classes.formMb}>
        <TextField
                  type='text'
                  fullWidth
                  name='username'
                  label='Username'
                  variant='outlined'
                  value={username}
                  onChange={this.handleOnChange}
          />
          
        </Grid>
        <Grid item xs={12} className={classes.formMb}>
        <TextField
            type='password'
                  fullWidth
                  name='password'
                  label='Password'
                  variant='outlined'
                  value={password}
                  onChange={this.handleOnChange}
          />
        </Grid>
        
          
        <Grid container item>
          <Grid item xs={6}>
          <Link to={"/forgot-password"}>Forgot Password?</Link>
          </Grid>
          <Grid item xs={6}>
          <Button fullWidth color='primary' variant='contained' type='submit'>Login</Button>
          </Grid>
        
        
        </Grid>
        
        
        
        
        
        
        
        </Grid>
        </form>
      
      <Grid item>
      <Paper variant="outlined" elevation={3} className={classes.paper}>
        <Typography color='primary'>
        Don't have an account? <Link to={'/'} color='inherit'>Sign up.</Link>
        </Typography>
      </Paper>
      
      </Grid>
              </Grid>
        
      

      
      </Fragment>
    );
  }
  
}}</LoggedInContext.Consumer>
    )
  
    

  }
}

export default withStyles(useStyles)(Login);

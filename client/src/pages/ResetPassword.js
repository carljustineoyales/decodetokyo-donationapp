import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import Navbar from '../components/Home/Navbar';
import {strapi} from '../components/functions'
import {withStyles} from '@material-ui/core/styles';
import {Grid,Link} from '@material-ui/core';
const useStyles = theme => ({
  mainStyle:{
    width:'100vw',
    height:'100vh',
    margin:'0'
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
export class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.state={
      password:'',
      passwordConfirmation:'',
      code:'',
      isSuccess:false
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }
  
  componentDidMount () {
    this.setState({
      code:queryString.parse(this.props.location.search)
    })
    
    
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    const {passwordConfirmation, password} =this.state;

    if (password === passwordConfirmation) {

      //move to backend
    // axios.post(`${strapi}/auth/reset-password`,{
    //   code:this.state.code.code,
    //   password,
    //   passwordConfirmation
    // })
    axios({
      url:'/resetpassword',
      method:'post',
      data:{
        code:this.state.code.code,
        password:password,
        passwordConfirmation:passwordConfirmation
      }
    })
    .then(res=>{
      this.setState({
        isSuccess:true
      })
      setTimeout(window.location.href='/login', 5000);
    })
    .catch(err=>console.log(err.response))
    } else {
      alert('password does not match')
    }
    
  }


  render() {
    const {isSuccess} = this.state
    const {classes} = this.props
    if (isSuccess) {
      return(
        <>
        {/* <Navbar/> */}
        <main className={classes.mainStyle}>
            
            <Grid container>
              <Grid item xs={6} className={classes.paperStyleBackground}>
                <div>
                <h1><Link className={classes.linkStyle} to={'/'}>Logo</Link></h1>
                <h4>Company Name</h4>
                </div>
              </Grid>
              
              
              <Grid container item xs={6} direction='row' justify='center' alignContent='center'>
                {/* <Login handleOnSuccess={handleOnSuccess} id={id}/>  */}
                <h1>you've successfully changed your password please enter your new credentials to log in. Thank you!</h1>
                <h5>Redirecting in 5 secs</h5>
              </Grid>
                
              
            </Grid>
            

          
        </main>
        
          </>
      );
    } else {
      return (
        <>
        {/* <Navbar/> */}
        {/* <main>
            <div className='container'>
          <form onSubmit={this.handleOnSubmit}>
          <label>New Password</label><br/>
            <input type='password' name='password' onChange={this.handleOnChange}/><br/><br/>
            <label>Confirm Password</label><br/>
            <input type='password' name='passwordConfirmation' onChange={this.handleOnChange}/><br/><br/>
            <button>Submit</button>
          </form>
          </div>
          </main> */}
          <main className={classes.mainStyle}>
            
              <Grid container>
                <Grid item xs={6} className={classes.paperStyleBackground}>
                  <div>
                  <h1><Link className={classes.linkStyle} to={'/'}>Logo</Link></h1>
                  <h4>Company Name</h4>
                  </div>
                </Grid>
                
                
                <Grid container item xs={6} direction='row' justify='center' alignContent='center'>
                <form onSubmit={this.handleOnSubmit}>
          <label>New Password</label><br/>
            <input type='password' name='password' onChange={this.handleOnChange}/><br/><br/>
            <label>Confirm Password</label><br/>
            <input type='password' name='passwordConfirmation' onChange={this.handleOnChange}/><br/><br/>
            <button>Submit</button>
          </form>
                  
                  
                </Grid>
                  
                
              </Grid>
              

            
          </main>
        </>
      );
    }
    
  }
}

export default withStyles(useStyles)(ResetPassword);

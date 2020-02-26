import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import {strapi, withToken} from '../functions'
import { LoggedInContext } from '../../contexts/LoggedInContext';

// import { bake_cookie } from 'sfcookies';


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
          // window.location.href = '/';
        })
        .catch(err => {
          console.log(err.response)
        })

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
    return(
<LoggedInContext.Consumer>{(context)=>{
    this.state.loggedin = context.loggedin
    const {username, password} = this.state;
  if (this.state.loggedin) {
    return (<Redirect to={`/feed`}/>)
  } else {
    return (
      <Fragment>
        <form onSubmit={this.onFormSubmit} className='form-group'>
        <div className="col-sm-5 mb-3">
        <input
                  type='text'
                  className='form-control form-control-sm w-100'
                  name='username'
                  placeholder='Username'
                  value={username}
                  onChange={this.handleOnChange}/>
        </div>
        <div className="col-sm-5 mb-3">
        <input
                  type='password'
                  className='form-control form-control-sm w-100'
                  name='password'
                  placeholder='Password'
                  value={password}
                  onChange={this.handleOnChange}/>
                  <Link to={"/forgot-password"}>Forgot Password?</Link>
        </div>
        <div className="col-sm-5 mb-3">
        <button className='btn btn-primary btn-sm w-100' type='submit'>Login</button>
        </div>
        </form>
      </Fragment>
    );
  }
  
}}</LoggedInContext.Consumer>
    )
  
    

  }
}

export default Login;

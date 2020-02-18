import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import {strapi, withToken} from '../functions'

// import { bake_cookie } from 'sfcookies';


export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      isLoggedIn: false,
      Loading: false,
      error: ''
    };
  }

  logInUser=()=>{
    const loginData = {
      identifier: this.state.username,
      password: this.state.password
    }
    this.setState({
      Loading: true
    }, () => {
      
      
      axios
        .post(`${strapi}/auth/local`, loginData)
        .then(res => {
          console.log(res)
          if (undefined === res.data.jwt) {
            this.setState({error: res.data.message, Loading: false});
            return;
          }

          localStorage.setItem('JWT', res.data.jwt);
          localStorage.setItem('username', res.data.user.username);
          localStorage.setItem('role', res.data.user.role.type);
          localStorage.setItem('id', res.data.user.id);

          this.setState({Loading: false, token: res.data.jwt, username: res.data.user.username, email: res.data.user.email, isLoggedIn: true});
          // window.location.href = '/';
        })
        .catch(err => {
          console.log(err.response.data.message)
        })
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
  
    const {username, password} = this.state;
    if (withToken()) {
      return (<Redirect to={`/feed`}/>)
    } else {
      return (
        <Fragment>
          <form onSubmit={this.onFormSubmit} className='form-inline'>
          <div className="col-sm-5">
          <input
                    type='text'
                    className='form-control form-control-sm w-100'
                    name='username'
                    placeholder='Username'
                    value={username}
                    onChange={this.handleOnChange}/>
          </div>
          <div className="col-sm-5">
          <input
                    type='password'
                    className='form-control form-control-sm w-100'
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={this.handleOnChange}/>
                    <Link to={"/forgot-password"}>Forgot Password?</Link>
          </div>
          <div className="col-sm">
          <button className='btn btn-primary btn-sm w-100' type='submit'>Login</button>
          </div>
          </form>
        </Fragment>
      );
    }

  }
}

export default Login;

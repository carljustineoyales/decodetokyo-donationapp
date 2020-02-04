import React, {Component, Fragment} from 'react';
import {getUserName, withToken, getRole,getId,strapi} from '../functions.js'
import {Link} from 'react-router-dom';
import Login from './Login';

// import { delete_cookie } from 'sfcookies';
export class Navbar extends Component {


  handleLogout = () => {
    sessionStorage.removeItem('JWT');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
    window.location.href = '/'
  }

  render() {
    console.log(this.props)
    const id = (getId())
      ? getId()
      : '';
    return (
      <header className="bg-light fixed-top">
      <div className=" container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <h2 className="navbar-brand">
            <Link  to="/">Logo</Link>
          </h2>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav ml-auto">
            
            {
              (getRole() === 'admin' || window.location.pathname === `/feed`) ? '' :(
                <li className="nav-item">
                <Link className="nav-link" to={'/feed'}>Support</Link>
              </li>
              )
            }
            {
              window.location.pathname === `/feed` ? (
                <Fragment><form className='form-inline'>
                <div className='col-sm-12'>
                <input className='form-control form-control-sm w-100' placeholder='Search' type='text'/>
                </div>
                
                </form></Fragment>
                ) : ''
            }
              
              {withToken()
                ? (
                  <Fragment>
                    <li className="nav-item">
                      <Link className="nav-link" to="/create-campaign">Create Campaign</Link>
                    </li>
                    {(getRole() === 'admin')
                      ? (
                        <Fragment>
                          <li className="nav-item">
                            <Link className="nav-link" to={`/dashboard/${getUserName()}`}>Dashboard</Link>
                          </li>
                        </Fragment>
                      )
                      : ''
}
                    <li className="nav-item">
                      <Link className="nav-link" to={`/profile/${id}`}>Profile</Link>
                    </li>
                    <li className="nav-item">
                      <button onClick={this.handleLogout} className='btn btn-secondary'>Logout</button>
                    </li>
                  </Fragment>
                )
                : (
                  
                    <Login/>
                
                )
}
            </ul>
          </div>
        </nav>
      </div>
      </header>
    );
  }
}

export default Navbar;

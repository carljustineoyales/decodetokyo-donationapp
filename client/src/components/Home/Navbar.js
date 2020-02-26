import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {CardListContext} from '../../contexts/CardListContext'
import axios from 'axios';
import { LoggedInContext } from '../../contexts/LoggedInContext.js';

export class Navbar extends Component {

  handleLogout = () => {
    
    // window.location.href = '/'
    axios.post('/logout',
    {
      withCredentials: true 
    }
    )
      .then(res=>{
        window.location.href = '/'
        
        console.log(res)
      })
      .catch(err=>{console.log(err)})
  }

  render() {
   
    return (
      <CardListContext.Consumer>{(CardContext) => {
          return (
            <LoggedInContext.Consumer>{(LoggedInContext)=>{
              const {loggedin,role,id,username,done} = LoggedInContext
          return(
            <header className="bg-light fixed-top">
              <div className=" container">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <h2 className="navbar-brand">
                  {loggedin ? <Link to="/feed">Logo</Link> : <Link to="/">Logo</Link>}
                    
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

                      {(role === 'admin' || window.location.pathname === `/feed`)
                        ? ''
                        : (
                          <li className="nav-item">
                            <Link className="nav-link" to={'/feed'}>Support</Link>
                          </li>
                        )
}
                      {window.location.pathname === `/feed`
                        ? (
                          <Fragment>
                            <form className='form-inline' onSubmit={CardContext.handleOnSearch}>
                              <div className='col-sm-12'>
                                <input
                                  className='form-control form-control-sm w-100'
                                  placeholder='Search by Title'
                                  onChange={CardContext.handleOnChange}
                                  type='text'/>
                              </div>

                            </form>
                          </Fragment>
                        )
                        : ''
}

                      {loggedin
                        ? (
                          <Fragment>
                          {done ? (
                            <li className="nav-item">
                              <Link className="nav-link" to="/create-campaign">Create Campaign</Link>
                            </li>
                          ) : ''}
                            
                            {(role === 'admin')
                              ? (
                                <Fragment>
                                  <li className="nav-item">
                                    <Link className="nav-link" to={`/dashboard/${id}`}>Dashboard</Link>
                                  </li>
                                </Fragment>
                              )
                              : ''
}
                            <li className="nav-item">
                              <Link className="nav-link" to={`/profile/${username}`}>Profile</Link>
                            </li>
                            <li className="nav-item">
                              <button onClick={this.handleLogout} className='btn btn-secondary'>Logout</button>
                            </li>
                          </Fragment>
                        )
                        : (
                          <li className="nav-item">
                              <Link className="nav-link" to={`/login`}>Login</Link>
                            </li>
                        )
}
                    </ul>
                  </div>
                </nav>
              </div>
            </header>
          )
        }}

        </LoggedInContext.Consumer>
          )
        }}

      </CardListContext.Consumer>

    );
  }
}

export default Navbar;

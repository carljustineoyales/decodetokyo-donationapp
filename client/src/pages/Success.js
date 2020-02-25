import React, { Component } from 'react';
import Navbar from '../components/Home/Navbar';
import { Link } from 'react-router-dom';
import { LoggedInContext } from '../contexts/LoggedInContext';

export class Success extends Component {
  render() {
    return (
      <LoggedInContext.Consumer>{(context)=>{
        return(
          <div>
        <Navbar/>
        <main>
          <div className='container'>
      <h1>Success</h1>
      <p>Please wait 2-3 days for verification</p>
      <p>click {context.loggedin ? <Link to={'/feed'}>here</Link> : <Link to={'/'}>here</Link>} to go to feed</p>
          </div>
        </main>
        
      </div>
        )
      }}</LoggedInContext.Consumer>
      
    );
  }
}

export default Success;

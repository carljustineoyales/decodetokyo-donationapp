import React, { Component } from 'react';
import Navbar from '../components/Home/Navbar';
import { Link } from 'react-router-dom';

export class Success extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <main>
          <div className='container'>
      <h1>Success</h1>
      <p>Please wait 2-3 days for verification</p>
      <p>click <Link to={'/'}>here</Link> to go to feed</p>
          </div>
        </main>
        
      </div>
    );
  }
}

export default Success;

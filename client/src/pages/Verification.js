import React, { Component } from 'react';
import {Link} from 'react-router-dom';
export class Verification extends Component {
  render() {
    return (
      <div>
        <h1>Verify your Email</h1>
        <p>Verify first your email to log in to your account.</p>
        <p>We recommend to verify your email to create a campaign</p>
        <p>If you want to browse the campaigns you can click the <strong>'Support'</strong> link on the navigation bar or click <Link to={'/feed'}>here</Link></p>
      </div>
    );
  }
}

export default Verification;

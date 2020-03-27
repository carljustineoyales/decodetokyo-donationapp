import React, { Component } from 'react';
import svg from '../../assets/undraw_gifts_btw0.svg'
export class About extends Component {
  render() {
    
    return (
      <>
      <h1>Share and Donate</h1>
      <p>We have <span>{this.props.cards.length}</span> on going campaigns who needs your support</p>
        <img src={svg} width='80%'/>
      </>
    );
  }
}

export default About;

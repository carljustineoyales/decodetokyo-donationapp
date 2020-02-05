import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
// import axios from 'axios'
// import {strapi} from '../functions'
export class SupporterItem extends Component {
constructor(props) {
  super(props);
  this.state={
    campaigns:[],
    error: ''
  }
} 
  render() {
    
    const {item} = this.props
    console.log(item)
    return (
      <Fragment>
        <tr>
          <td>{item.name}</td>
          <td>{item.email}</td>
          
              {item.campaigns.map(campaign=>(<td key={campaign.id}>{campaign.title} by {campaign.username}</td>))}
          <td>{item.campaigns[0].currency} {item.donation}</td>
          <td>
          </td>

        </tr>
      </Fragment>
    );
  }
}

export default SupporterItem;

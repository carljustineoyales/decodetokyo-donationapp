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
          <td>
            <ul>
              {item.campaigns.map(campaign=>(<li key={campaign.id}>{campaign.title} by {campaign.username}</li>))}
            </ul>
          </td>
          <td>
            {/* <ul>
              {item
                .donated
                .map(donation => (
                  <li key={donation.id}>
                    {donation.amount}</li>
                ))}
            </ul> */}
          </td>
          <td>
            <Link to={`#`}>Review</Link>
          </td>

        </tr>
      </Fragment>
    );
  }
}

export default SupporterItem;

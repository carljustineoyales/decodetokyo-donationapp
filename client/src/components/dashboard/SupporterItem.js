import React, {Component, Fragment} from 'react';
export class SupporterItem extends Component {
constructor(props) {
  super(props);
  this.state={
    campaigns:[],
    error: ''
  }
} 
  render() {
    
    const {id,name,email,campaigns,donation,orderID} = this.props.item
    
    console.log(this.props.item)
    return (
      <Fragment>
        <tr>
          <td>{orderID}</td>
          <td>{name}</td>
          <td>{email}</td>
          
          {campaigns.map(campaign=>(
            <Fragment key={id}>
            <td >{campaign.title} by {campaign.username}</td>
            <td>{campaign.currency} {donation}</td>
            </Fragment>))
            }
        </tr>
      </Fragment>
    );
  }
}

export default SupporterItem;

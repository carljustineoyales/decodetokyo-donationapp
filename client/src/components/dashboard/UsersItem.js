import React, {Component, Fragment} from 'react';
import axios from 'axios'
import {strapi} from '../functions'
// import { Link } from 'react-router-dom';
export class UsersItem extends Component {

  constructor(props) {
    super(props);
    this.state={
      campaigns:[],
      error: ''
    }
  }
  

  componentDidMount() {
    axios.get(`${strapi}/campaigns/?username=${this.props.item.username}`)
    .then(res=>{
      console.log(res.data)
      this.setState({
        campaigns:res.data
      })
      
    })
    .catch(err=>{console.log(err.response.data.message)})
  }

  render() {
    const {campaigns} = this.state
    const {item} = this.props
    return (
      <Fragment>
        <tr>
          <td>{item.username}</td>
          <td>{item.first_name} {item.last_name}</td>
          <td>{item.email}</td>
          <td>{item.address} {item.city} {item.zipcode} {item.country}</td>
          <td>{campaigns.length}</td>
          <td><a href={`/profile/${item.username}` } target='_blank' rel="noopener noreferrer">Profile</a></td>
        </tr>
      </Fragment>
    );
  }
}

export default UsersItem;

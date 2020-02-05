import React, {Component} from 'react';
import axios from 'axios'
import {strapi,withToken} from '../functions'
import UsersItem from './UsersItem'
export class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      error: ''
    }
  }
  componentDidMount() {
    this._isMounted = true;
    axios
      .get(`${strapi}/users`,{
        headers:{
          'Authorization':`Bearer ${withToken()}`
        }
      })
      .then(res => {
        if (this._isMounted) {
          
          this.setState({items: res.data})
        }
      })
      .catch(err => {
        console.log(err.response.data.message)
      })
  }


  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {items} = this.state
    return (
      <div>
        <h2>Users</h2>
        <p>This table shows users that are registered in the database</p>
        <input type='text' placeholder='search'/>
        <table className="table table-hover">

          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Campaigns</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (<UsersItem key={item.id} item={item}/>))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}

export default UsersTable;

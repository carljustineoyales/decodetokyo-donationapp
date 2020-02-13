import React, {Component} from 'react';
import axios from 'axios'
import {strapi,withToken} from '../functions'
import UsersItem from './UsersItem'
export class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter:'',
      items: [],
      error: ''
    }
  }
  
  handleOnchange = (event) => {
    this.setState({filter: event.target.value})
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
    const {filter} = this.state
    const filteredItems = this.state.items.filter(item => {
      return item.username.toLowerCase().includes(filter.toLowerCase())
    })
    return (
      <div>
        <h2>Users</h2>
        <p>This table shows users that are registered in the database</p>
        <input type='text' onChange={this.handleOnchange} placeholder='Filter by username'/>
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
            {filteredItems.map(item => (<UsersItem key={item.id} item={item}/>))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}

export default UsersTable;

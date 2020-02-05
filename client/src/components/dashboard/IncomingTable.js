import React, {Component} from 'react';
import {strapi} from '../functions'
import axios from 'axios';
import IncomingItem from './IncomingItem';
export class IncomingTable extends Component {
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
      .get(`${strapi}/campaigns?verified=false&deleted=false`)
      .then(res => {
        console.log(res.data)
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
        <h2>Incoming Campaigns</h2>
        <p>This table shows campaigns for approval</p>
        <input type='text' placeholder='search'/>
        <table className="table table-hover">

          <thead>
            <tr>
              <th > Ref. ID</th>
              <th >Title</th>
              <th >Author</th>
              <th >Goal</th>
              <th >Date Created</th>
              <th >Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (<IncomingItem key={item.id} item={item}/>))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}

export default IncomingTable;

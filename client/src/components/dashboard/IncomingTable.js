import React, {Component} from 'react';
import {strapi} from '../functions'
import axios from 'axios';
import IncomingItem from './IncomingItem';
export class IncomingTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter:'',
      items: [],
      error: ''
    }
    this.handleOnchange = this.handleOnchange.bind(this)
  }

  componentDidMount() {
    this._isMounted = true;
    // axios
    //   .get(`${strapi}/campaigns?verified=false&deleted=false`)
    axios({
      url:`/getcampaign`,
      method:'post',
      withCredentials:true
    })
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

  handleOnchange = (event) => {
    this.setState({filter: event.target.value})
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {filter} = this.state;
    const filteredItems = this.state.items.filter(item => {
      return item.reference.includes(filter.toLowerCase())
    })
    return (
      <div>
        <h2>Incoming Campaigns</h2>
        <p>This table shows campaigns for approval</p>
        <input type='text' onChange={this.handleOnchange} placeholder='Filter by Ref. ID'/>
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
            {filteredItems.map(item => (<IncomingItem key={item.id} item={item}/>))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}

export default IncomingTable;

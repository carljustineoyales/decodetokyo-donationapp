import React, { Component } from 'react';
import SupporterItem from './SupporterItem';
import axios from 'axios';
import {strapi,withToken} from '../functions';
export class supporterTable extends Component {

  constructor(props) {
    super(props);
    this.state ={
      items:[],
      error: ''
    }
  }

  removeSupporters = () => {
    this.state.items.map(item=>{
      if(item.campaigns.length <= 0 ){
        axios.delete(`${strapi}/supporters/?id=${item.id}`)
        .then(res=>{
          console.log(res.data)
        })
        .catch(err=>{
          console.log(err)
        })
      }else{
        return
      }
    })
  }

  componentDidMount(){
    axios.get(`${strapi}/supporters`,{
      headers:{
        'Authorization': `Bearer ${withToken()}`
      }
    })
    .then(res=>{
      this.setState({
        items:res.data
      })
      console.log(this.state.items)
      this.removeSupporters();
    })
    .catch(err=>{console.log(err.response.data.message)})
  }
  

  render() {
    const {items} = this.state
    return (
      <div>
        <h2>Supporter</h2>
        <p>This table shows supporters of a campaign</p>
        <input type='text' placeholder='search'/>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Campaigns Supported</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (<SupporterItem key={item.id} item={item}/>))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}

export default supporterTable;

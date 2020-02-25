import React, { Component } from 'react';
import SupporterItem from './SupporterItem';
import axios from 'axios';
import {strapi,withToken} from '../functions';
export class supporterTable extends Component {

  constructor(props) {
    super(props);
    this.state ={
      filter:'',
      items:[],
      error: ''
    }
  }

  removeSupporters = () => {
    this.state.items.map(item=>{
      if(item.campaigns.length <= 0 ){
        // axios.delete(`${strapi}/supporters/${item.id}`)
        axios({
          url:`/deletesupporters`,
          method:'post',
          params:{
            id:item.id
          },
          withCredentials:true
        })
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

  handleOnchange = (event) => {
    this.setState({filter: event.target.value})
  }

  componentDidMount(){
    
    axios.post('/getsupporters')
    .then(res=>{
      this.setState({
        items:res.data
      })
      console.log(this.state.items)
      this.removeSupporters();
    })
    .catch(err=>{console.log(err)})
  }
  

  render() {
    const {filter} = this.state;
    const filteredItems = this.state.items.filter(item => {
      return item.orderID.includes(filter)
    })
    return (
      <div>
        <h2>Supporter</h2>
        <p>This table shows supporters of a campaign</p>
        <input type='text' onChange={this.handleOnchange} placeholder='Filter by order ID'/>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Campaigns Supported</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (<SupporterItem key={item.id} item={item}/>))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    );
  }
}

export default supporterTable;

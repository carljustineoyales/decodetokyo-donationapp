import React, {Component, Fragment} from 'react';
import Moment from 'react-moment';
import {strapi,withToken} from '../functions'
import axios from 'axios';
import { Link } from 'react-router-dom';

export class IncomingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      error: ''
    }
  }

  approveItem= (event)=> {
    event.preventDefault();
    const data = {
      verified: true,
    }
    axios
      .put(`${strapi}/campaigns/${this.props.item.id}`,{
        headers:{
          'Authorization':`Bearer ${withToken()}`
        }
      }, data)
      .then(res => {
        console.log(res.data)
        this.setState({clicked: !this.state.clicked})
      })
      .catch(err => {
        console.log(err.response.data.message)
      })

  }

  deleteItem =(event)=>  {
    event.preventDefault();
    const data = {
      deleted: true,
    }
    axios
      .put(`${strapi}/campaigns/${this.props.item.id}`, data)
      .then(res => {
        console.log(res.data)
        this.setState({clicked: !this.state.clicked})
      })
      .catch(err => {
        console.log(err.response.data.message)
      });
  }

  render() {
    const {item} = this.props
    const {clicked} = this.state
    if (!clicked) {
      return (
        <Fragment>
          <tr>
            <td>{item.reference}</td>
            <td>{item.title}</td>
            {/* <td>{item.author.first_name} {item.author.last_name}</td> */}
            <td>{item.author.first_name} {item.author.last_name}</td>
            <td>{item.goal}</td>
            <td>
              <Moment format='MMM DD YYYY'>{item.created_at}</Moment>
            </td>
            <td>
              <button onClick={this.approveItem} className='btn btn-success'>&#10004;</button>
              <button onClick={this.deleteItem} className='btn btn-danger'>&#10006;</button>
              <Link to={`/campaign/${item.id}`} className='btn btn-warning'>&#9998;</Link>
            </td>

          </tr>
        </Fragment>

      );
    } else {
      return (
        <Fragment>
          <tr></tr>
        </Fragment>
      );
    }
  }
}

export default IncomingItem;

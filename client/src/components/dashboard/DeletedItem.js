import React, {Component, Fragment} from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import {strapi} from '../functions';

export class DeletedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      error: ''
    }
  }

  restoreItem = (event) => {
    event.preventDefault();
    const data = {
      deleted: false
    }
    
    // axios
    //   .put(`${strapi}/campaigns/${this.props.item.id}`, data)
    axios({
      url:'/restorecampaign',
      method:'post',
      withCredentials:true,
      data:{
        deleted:false,
        id:this.props.item.id
      },
    })
      .then(res => {
        console.log(res.data)
        this.setState({
          clicked: !this.state.clicked
        })
      })
      .catch(err => {
        console.log(err.response.data.message)
      });
  }

  deleteItem = (event) => {
    event.preventDefault();
    
    // axios
    //   .delete(`${strapi}/campaigns/${this.props.item.id}`)
    axios({
      url:'/destroycampaign',
      method:'post',
      data:{
        id:this.props.item.id
      },
      withCredentials:true
    })
      .then(res => {
        console.log(res.data)
        this.setState({
          clicked: !this.state.clicked
        })
      })
      .catch(err => {
        console.log(err.response.data.message)
      })
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
            <td>{item.author.first_name} {item.author.last_name}</td>
            <td>{item.goal}</td>
            <td>
              <Moment format='MMM DD YYYY'>{item.created_at}</Moment>
            </td>
            <td>
              <button onClick={this.restoreItem} className='btn btn-success'>&#8634;</button>
              <button onClick={this.deleteItem} className='btn btn-danger'>&#10006;</button>
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

export default DeletedItem;

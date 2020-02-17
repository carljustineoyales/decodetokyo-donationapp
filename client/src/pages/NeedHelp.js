import React, { Component } from 'react';
import axios from 'axios'
import Navbar from '../components/Home/Navbar'
export class NeedHelp extends Component {
  constructor(props) {
    super(props);
    this.state={
      fb:'',
      email:'',
      name:'',
      message:''
    }
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    const {name,fb,message,email} = this.state
    axios.post('/api/form',{
      name,
      fb,
      email,
      message
    }).then(res=>console.log(res.data))
    .catch(err=>console.log(err.response))
  }
  
  render() {
    return (
      <>
      <Navbar/>
      <main>
          <div className='container'>
          <form onSubmit={this.handleOnSubmit}>
          <label htmlFor='fb'>Facebook</label><br/>
          <input type='email' name='fb' onChange={this.handleOnChange}/><br/><br/>
          <label htmlFor='link'>Email</label><br/>
          <input type='email' name='email' onChange={this.handleOnChange}/><br/><br/>
          <label htmlFor='name'>Name</label><br/>
          <input type='text' name='name' onChange={this.handleOnChange}/><br/><br/>
          <label htmlFor='name'>Message</label><br/>
          <textarea name='message' onChange={this.handleOnChange}></textarea><br/><br/>
          <button>Submit</button>
        </form>
          </div>
          
          </main>
       
      </>
    );
  }
}

export default NeedHelp;

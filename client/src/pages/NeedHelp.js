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
      message:'',
      sent:false,
      errors:[],
      isLoading:false,
    }
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOnSubmit = (event) => {
    this.state.errors = []
    event.preventDefault();
    const {name,fb,message,email} = this.state
    
    axios.post('/api/form',{
      name,
      // fb,
      email,
      message
    }).then(res=>{
      this.setState({
        sent:true
      })
    })
    .catch(err=>{
      console.log(err.response.data)
      err.response.data.map(item=>{
        if(!this.state.errors.includes(item)){
          this.state.errors.push(item)
        }
      })
      this.setState({
        isLoading:true
      })
    })
  }
  
  render() {
    if(this.state.sent){
      return (
        <>
        <Navbar/>
        <main>
            <div className='container'>
            <h1>Ticket Sent</h1>
            <p>create another ticket <a href='/help'>here</a> </p>
            </div>
            
            </main>
         
        </>
      );
    }else{
    return (
      <>
      <Navbar/>
      <main>
        
          <div className='container'>
          <h1>Create a Ticket</h1>
          {(this.state.errors.length > 0) ? (
            this.state.errors.map(item => (
              <div>{item}</div>
            ))
          ): ''}
          <form onSubmit={this.handleOnSubmit}>
          {/* <label htmlFor='fb'>Facebook</label><br/>
          <input type='email' name='fb' onChange={this.handleOnChange}/><br/><br/> */}
          <label htmlFor='link'>Facebook or Email</label><br/>
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
}

export default NeedHelp;

import React, { Component } from 'react';
import axios from 'axios'
import Navbar from '../components/Home/Navbar';
import {Grid, TextField, Typography,Button} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'
const useStyles = theme => ({
  mainStyle:{
    margin:theme.spacing(14),
    height:'auto',
    
  },
  heading1:{
    fontSize:'48px',
  }
})
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
    const { classes } = this.props
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
      <main className={classes.mainStyle}>
        
          
          
          
          {(this.state.errors.length > 0) ? (
            this.state.errors.map(item => (
              <div>{item}</div>
            ))
          ): ''}
          <form onSubmit={this.handleOnSubmit} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <Typography variant='h1' color='primary' className={classes.heading1}>
          Create a Ticket
          </Typography>
          <br/>
          <br/>
              <Grid container  spacing={2} lg={6} >
                <Grid item sm={12}>
                <TextField variant='outlined' type='email' fullWidth label='Email' required name='email' onChange={this.handleOnChange}/>
                </Grid>
                <Grid item sm={12}>
                <TextField
          id="filled-multiline-flexible"
          label="Message"
          multiline
          rows="12"
            fullWidth
          variant="outlined"
          name='message' onChange={this.handleOnChange}
        />
                </Grid>
                <Grid item sm={12}>

                </Grid>
                <Grid item md={12} sm={12}>
                  <Button type='submit' fullWidth variant='contained' color='primary'>Submit</Button>
                </Grid>
              </Grid>
          {/* <label htmlFor='link'>Facebook or Email</label><br/>
          <input type='email' name='email' onChange={this.handleOnChange}/><br/><br/>
          <label htmlFor='name'>Name</label><br/>
          <input type='text' name='name' onChange={this.handleOnChange}/><br/><br/>
          <label htmlFor='name'>Message</label><br/>
          <textarea name='message' onChange={this.handleOnChange}></textarea><br/><br/>
          <button>Submit</button> */}
          
        </form>
         
          
          </main>
       
      </>
    );
  }
}
}

export default withStyles(useStyles)(NeedHelp);

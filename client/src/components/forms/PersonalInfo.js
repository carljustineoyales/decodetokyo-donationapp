import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Navbar from '../Home/Navbar';
import { LoggedInContext } from '../../contexts/LoggedInContext';
import validator from 'validator';
import { Grid, TextField, Button, Paper, Typography,Link } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import PersonalInfoForm from './PersonalInfoForm'
import PaymentDetails from './PaymentDetails'
import Confirm from './Confirm';


const useStyles = theme => ({
  mainStyle:{
    width:'100vw',
    height:'100vh',
    margin:'0'
  },
  paperStyleBackground:{
    background: 'rgb(0,152,131)',
    background: 'linear-gradient(-45deg, rgba(0,152,131,1) 0%, rgba(0,192,99,1) 100%)',
    borderRadius:'0',
    height:'100vh',
    display:'flex',
    flowDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    color:'#fff',
    textAlign:'center'
  },
  paperStyle:{
    background:'white',
    borderRadius:'0',
    
  },
  linkStyle:{
    color:'#fff',
    "&:hover": {
      textDecoration:'none',
      color:'#fff',
    }
  }
})
export class PersonalInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step:1,
      id:'',
      first_name: '',
      last_name: '',
      address: '',
      city: '',
      addressState:'',
      zipcode: '',
      bank_account: '',
      bank_name: '',
      paypal_email:'',
      gcash_number:'',
      account_name:'',
      country:'',
      done: true,
      errors: [],
      refresh: false,
      noErrors: false,
      axiosError: '',
      isLoading:false
    }

    this.handleOnChange = this
      .handleOnChange
      .bind(this);
    this.handleOnSubmit = this
      .handleOnSubmit
      .bind(this);

  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step:step+1
    })
  }
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step:step-1
    })
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    if(validator.isEmpty(event.target.value)){
      if(event.target.name === 'bank_account' || event.target.name === 'bank_name'){
        return
      }else{
        if(!this.state.errors.includes(`empty ${event.target.id}`)){
          this.state.errors.push(`empty ${event.target.id}`)
        }
        if(this.state.errors.includes(`invalid ${event.target.id}`)){
          this.state.errors = this.state.errors.filter(item => item !== `invalid ${event.target.id}`)
        }
      }
    }else{
      if(this.state.errors.includes(`empty ${event.target.id}`)){
        this.state.errors = this.state.errors.filter(item => item !== `empty ${event.target.id}`)
      }
    }
  }

  handleOnSubmit = () => {
    

    const {
      id,
      first_name,
      last_name,
      address,
      city,
      addressState,
      zipcode,
      bank_account,
      bank_name,
      paypal_email,
      gcash_number,
      account_name,
      country,
      done
    } = this.state;
    const data = {
      id,
      first_name,
      last_name,
      address,
      city,
      addressState,
      zipcode,
      bank_account,
      bank_name,
      paypal_email,
      gcash_number,
      account_name,
      country,
      done
    }
    
      axios({
        url:'/finishsignup',
        method:'post',
        data,
        withCredentials:true
      })
      .then(res => {
        window.parent.location = '/create-campaign'
      }).catch(err => {
        console.log(err.response.data)
        err.response.data.map(item => this.state.errors.push(item))
        this.setState({
          isLoading:true
        })
      })
  }

  showForms = () => {
    const {step} = this.state;
    const {first_name,
    last_name,
    address,
    city,
    addressState,
    zipcode,
    bank_account,
    bank_name,
    account_name,
    paypal_email,
    gcash_number,
    country} = this.state;
    const values = {
      first_name,
      last_name,
      address,
      city,
      addressState,
      zipcode,
      bank_account,
      bank_name,
      account_name,
      paypal_email,
      gcash_number,
      country}
    switch(step){
      case 1:
      
      return (
        <PersonalInfoForm nextStep={this.nextStep} values={values} handleOnChange={this.handleOnChange}/>
        
        );
      case 2:
      return(
        <PaymentDetails nextStep={this.nextStep} prevStep={this.prevStep} values={values} handleOnChange={this.handleOnChange}/>
      )
      case 3:
      return(
        <Confirm nextStep={this.nextStep} prevStep={this.prevStep} values={values} handleOnSubmit={this.handleOnSubmit}/>
      )
      case 4:
      return(
        <h1>Success</h1>
      )
    }
  }
  render() {
    const {classes} = this.props
    
    return(
      <LoggedInContext.Consumer>{(context)=>{
        this.state.id = context.id
        return(
          <>
          <main className={classes.mainStyle}>
          <Grid container>
                <Grid item xs={6} className={classes.paperStyleBackground}>
                  <div>
                  <h1><Link className={classes.linkStyle} to={'/'}>Logo</Link></h1>
                  <h4>Company Name</h4>
                  </div>
                </Grid>
                
                
                <Grid container item xs={6} direction='row' justify='center' alignContent='center'>
                <div style={{width:'80%'}}>
                {this.showForms()}
                </div>
                  
                </Grid>
                  
                
              </Grid>
          
          </main>
          </>
        )
            
    }}</LoggedInContext.Consumer>
    )
    
    
  }
}

export default withStyles(useStyles)(PersonalInfo);

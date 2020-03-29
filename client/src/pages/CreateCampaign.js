import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {strapi, getUserName, withToken} from '../components/functions';
import Navbar from '../components/Home/Navbar';
import Success from './Success';
import { LoggedInContext } from '../contexts/LoggedInContext';
import validator from 'validator';
import Moment from 'react-moment'
import {Grid,Button,TextField,MenuItem,Backdrop,Fade, Card, CardHeader, Avatar, CardMedia,CardContent,Typography } from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


const currencies = [

  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const useStyles = theme => ({
  root: {
    width: '30%',
    
  },
  desc:{
    height:'160px',
    overflow:'hidden'
  },
  mainStyle:{
    margin:theme.spacing(10),
    height:'auto',
  },
  input: {
    display: 'none',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  },
  
  media: {
    height: 0,
    paddingTop: '50%', // 16:9
  },
})
export class CreateCampaign extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open:false,
      title: '',
      description: '',
      goalFund: '',
      author: {},
      reference: Math.floor(Math.random() * 31415926),
      username: '',
      images: {},
      currency:'USD',
      isSuccess:false,
      response:{},
      errors:[],
      isLoading:false,
      name:'',
      dataImg:'',
      avatar:''
    }
  }


  handleChange = input => e => {

    if (e.target.type === 'file') {
      this.setState({
        images: e.target.files[0],
        dataImg:URL.createObjectURL(e.target.files[0])
      })
      
      console.log(e.target.files[0])
    }
    this.setState({[input]: e.target.value})
  }

  getUser = () => {
    if(validator.isEmpty(this.state.title)){
      if(!this.state.errors.includes('title cannot be empty')){
        this.state.errors.push('title cannot be empty')
      }
    }else{
      if(this.state.errors.includes('title cannot be empty')){
        this.state.errors = this.state.errors.filter(item => item !== 'title cannot be empty')
      }
    }

    if(validator.isEmpty(this.state.description)){
      if(!this.state.errors.includes('description cannot be empty')){
        this.state.errors.push('description cannot be empty')
      }
    }else{
      if(this.state.errors.includes('description cannot be empty')){
        this.state.errors = this.state.errors.filter(item => item !== 'description cannot be empty')
      }
    }

    if(validator.isEmpty(this.state.goalFund)){
      if(!this.state.errors.includes('goal cannot be empty')){
        this.state.errors.push('goal cannot be empty')
      }
    }else{
      if(this.state.errors.includes('goal cannot be empty')){
        this.state.errors = this.state.errors.filter(item => item !== 'goal cannot be empty')
      }
    }

    if(this.state.images.name === '' || this.state.images.name === undefined || this.state.images.name === null ){
      if(!this.state.errors.includes('upload image')){
        this.state.errors.push('upload image')
      }
    }else{
      if(this.state.errors.includes('upload image')){
        this.state.errors = this.state.errors.filter(item => item !== 'upload image')
      }
    }
    
    axios.get(`${strapi}/users/?username=${this.state.username}`).then(res => {

      this.setState({
        author: {
          id: res.data[0].id
        },
        username: this.state.username
      })

      this.postCampaign();
    }).catch(err => {
      console.log(err)
    })

  }

  postCampaign = () => {

    const datas = {
      'title': this.state.title,
      'description': this.state.description,
      'author': this.state.author,
      'reference': this.state.reference,
      'goal': this.state.goalFund,
      'verified': false,
      'deleted': false,
      'requested':false,
      'raised': 0,
      'username': this.state.username,
      'currency':this.state.currency
    };
    // const data = this.state
    
    
    //move to backend
    
      console.log(datas)
     
        var bodyFormData = new FormData();
  
      bodyFormData.append('files.image', this.state.images, this.state.images.name)
      bodyFormData.append('data', JSON.stringify(datas));
      console.log(JSON.stringify(datas))
      
      if(this.state.errors.length <= 0){
      axios({
      
        url: `${strapi}/campaigns`,
        method: 'post',
        data:bodyFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
          
          // 'Authorization': `Bearer ${withToken()}`
          },
          // withCredentials:true
        })
        .then(res=> {
          this.setState({
            isSuccess:true,
            response:res.data
          })
          console.log(res);
        })
        .catch(err=> {
          //handle error
          console.log(err.response);
        });
    }
    
  }

  handleOpen = (event) => {
    event.preventDefault();
    axios.get(`${strapi}/users/?username=${this.state.username}`)
      .then(res=>{
        console.log(res.data)
        if(res.data[0].avatar === null){
          this.setState({
            name:`${res.data[0].first_name} ${res.data[0].last_name}`,
            avatar:null
          })
        }else{
          this.setState({
            name:`${res.data[0].first_name} ${res.data[0].last_name}`,
            avatar:res.data[0].avatar.url
          })
        }
        
      })
    this.setState({
      open:true,
      
    })

  };
  handleClose = (event) => {
    event.preventDefault();
    this.setState({
      open:false
    })
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.getUser();
  }
  
  render() {
    
    const {classes} = this.props
    const {title, description, goalFund,isSuccess} = this.state
    const values = { title, description, goalFund };
    return(
<LoggedInContext.Consumer>{(context)=>{
      const {username,loggedin} = context;
      this.state.username = username
        if (isSuccess) {
      return (
            <Success/>
      )
    } else {
      return (
        <Fragment>
          <Navbar/>
          <main className={classes.mainStyle}>
            
            {/* {loggedin ? <Link to={'/feed'}>Go Back</Link> : ''}
              <h1>Create A Campaign</h1><br/> */}
              
        {(this.state.errors.length > 0)
          ? <div className="alert alert-danger" role="alert">{this
                .state
                .errors
                .map(error => (
                  <div key={error.id}>{error}</div>
                ))}</div>
          : ''}
              {/* <form onSubmit={this.onFormSubmit}>
              <div className='row'>
                  <div className="col-md-12 mb-3">
                  <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Image tooltip">
  
                    <label for='image'>Image <img
                        src="https://img.icons8.com/material-rounded/18/000000/help.png"
                        alt='help-icon'/></label>
                        </span>
                    <input
                      type='file'
                      className="form-control-file form-control-sm"
                      onChange={this.handleChange('image')}
                      value={values.image}/>
  
                  </div>
  
                </div>
                <div className='row '>
                  <div className="col-md-12 mb-3">
                  <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Title tooltip">
                    <label for='Title'>Title <img
                        src="https://img.icons8.com/material-rounded/18/000000/help.png"
                        alt='help-icon'/></label></span>
                    <input
                      className='form-control form-control-sm'
                      type='text'
                      onChange={this.handleChange('title')}
                      value={values.title}/>
  
                  </div>
  
                </div>
                <div className='row'>
                  <div className="col-md-12 mb-3">
                  <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Description tooltip">
                    <label for='Description'>Description <img
                        src="https://img.icons8.com/material-rounded/18/000000/help.png"
                        alt='help-icon'/></label>
                        </span>
                    
                    <textarea
                      className="form-control form-control-sm"
                      rows="12"
                      onChange={this.handleChange('description')}
                      value={values.description}></textarea>
  
                  </div>
  
                </div>
                <div className='row'>
                  <div className="col-md-12">
                  <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Goal tooltip">
                    <label for='Description'>Funding Goal <img
                        src="https://img.icons8.com/material-rounded/18/000000/help.png"
                        alt='help-icon'/></label>
                        </span>
                    
                  
                  </div>
  
                </div>
                <div className='row'>
                    <div className="col-md-2 mb-3">
                      <select id="currencyList" className="form-control-file form-control-sm" onChange={this.handleChange('currency')}>
                        <option value="USD" selected="selected" label="US dollar">USD</option>
                        <option value="AUD" label="Australian dollar">AUD</option>
                        <option value="BRL" label="Brazilian real">BRL</option>
                        <option value="CAD" label="Canadian dollar">CAD</option>
                        <option value="CHF" label="Swiss franc">CHF</option>
                        <option value="CZK" label="Czech koruna">CZK</option>
                        <option value="DKK" label="Danish krone">DKK</option>
                        <option value="EUR" label="EURO">EUR</option>
                        <option value="GBP" label="British pound">GBP</option>
                        <option value="HKD" label="Hong Kong dollar">HKD</option>
                        <option value="HUF" label="Hungarian forint">HUF</option>
                        <option value="IDR" label="Indonesian rupiah">IDR</option>
                        <option value="ILS" label="Israeli new shekel">ILS</option>
                        <option value="JPY" label="Japanese yen">JPY</option>
                        <option value="MXN" label="Mexican peso">MXN</option>
                        <option value="MYR" label="Malaysian ringgit">MYR</option>
                        <option value="NOK" label="Norwegian krone">NOK</option>
                        <option value="NZD" label="New Zealand dollar">NZD</option>
                        <option value="PHP" label="Philippine peso">PHP</option>
                        <option value="PLN" label="Polish złoty">PLN</option>
                        <option value="RUB" label="Russian ruble">RUB</option>
                        <option value="SEK" label="Swedish krona">SEK</option>
                        <option value="SGD" label="Singapore dollar">SGD</option>
                        <option value="TWD" label="New Taiwan dollar">TWD</option>
                      </select>
                    </div>
                    <div className="col-md-10 mb-3">
  
                      <input
                        type='number'
                        className="form-control form-control-sm"
                        placeholder='Funding Goal Amount'
                        onChange={this.handleChange('goalFund')}
                        value={values.goalFund}/>
                    </div>
                  </div>

                
                <div className='row '>
                  <div className="col-md-9 mb-3">
                    <Link to="/help">Need Help?</Link>
                  </div>
                  <div className="col-md-3">
                    <button className='btn btn-warning w-100'>Submit</button>
                  </div>
  
                </div>
              </form> */}
              
              <Grid container direction='column' justify='center' alignContent='center'>
              {loggedin ? <Link to={'/feed'}>Go Back</Link> : ''}
              <h1>Create A Campaign</h1><br/>
              <form onSubmit={this.onFormSubmit}>
                <Grid container spacing={3} >
                  <Grid item xs={12} sm={12} >
                      <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      onChange={this.handleChange('image')}
                                    value={values.image}
                      type="file"
                    />
                    <label htmlFor="contained-button-file">
                      <Button variant="contained" color="primary" component="span">
                        Upload
                      </Button>
                    </label>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField required 
                    id="standard-required" 
                    label="Title" 
                    helperText="Required Field" 
                    variant='outlined'
                    fullWidth
                    type='text'
                      onChange={this.handleChange('title')}
                      value={values.title}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                      <TextField
                          required
                          id="outlined-multiline-flexible"
                          label="Description"
                          multiline
                          fullWidth
                          rows="16"
                          helperText="Required Field" 
                          onChange={this.handleChange('description')}
                                      value={values.description}
                          variant="outlined"
                        />
                  </Grid>
                  <Grid item xs={12} sm={2} >
                      <TextField
                        required
                        id="outlined-select-currency"
                        select
                        label="Curency"
                        value={this.state.currency}
                        onChange={this.handleChange('currency')}
                        helperText="Please select your currency"
                        variant="outlined"
                        fullWidth
                      >
                        {currencies.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                        <TextField required 
                        id="standard-required" 
                        label="Amount" 
                        helperText="Required Field" 
                        variant='outlined'
                        type='number'
                        fullWidth
                        onChange={this.handleChange('goalFund')}
                        value={values.goalFund}
                        />
                  </Grid>
                  <Grid item xs={12} sm={9}>
                  <Link to="/help">Need Help?</Link>
                  
                  </Grid>
                  <Grid item container spacing={2} xs={12} sm={3}>
                          <Grid item sm={6} >
                          <Button color='primary' variant='outlined'  fullWidth type='button' onClick={this.handleOpen}>Preview</Button>
                          </Grid>
                          <Grid item sm={6}>
                          <Button color='primary' variant='contained' fullWidth type='submit'>Submit</Button>
                          </Grid>
                  
                 
                  
                  </Grid>
                  
                </Grid>
              </form>
              </Grid>
              <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={this.state.open}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.open}>
        <Card className={classes.root}>
<CardHeader
  // avatar={
  //   <Avatar aria-label="recipe" className={classes.avatar} src={this.state.avatar}/>
      
    
  // }
  avatar={
          (this.state.avatar === null) ? <Avatar className={classes.avatar}/> : <Avatar aria-label="recipe" className={classes.avatar} src={this.state.avatar} className={classes.large}/>
        }
  title={<Link to={`#`}>{this.state.name}</Link>}
  subheader='Created few minutes ago'
/>
<CardMedia
  className={classes.media}
  image={`${this.state.dataImg}`}
  title={`${title}`}
/>
<CardContent>
  <Typography variant="h6" color="textPrimary" component="p">
  {title}
  </Typography>
  <Typography variant="body2" color="textSecondary" component="p" className={classes.desc}>
  
 {description}
  </Typography>
</CardContent>
<CardContent>
  
  <Typography>
  <Link to={`#`} >Read More..</Link>

  </Typography>
</CardContent>

</Card>
        </Fade>
      </Modal>
          </main>
        </Fragment>
      );
    }
      
    }}

    </LoggedInContext.Consumer>
    );
    
    
    
  }
}

export default withStyles(useStyles)(CreateCampaign);
import React, {Component, Fragment} from 'react';
import Navbar from '../components/Home/Navbar';
import axios from 'axios';
import {strapi, getId, getUserName, withToken} from '../components/functions'
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import { Grid, Typography,Button,Divider, TextField, MenuItem, Avatar } from '@material-ui/core';
const countries = [
  {
    value: 'Philippines',
    label: 'Philippines',
  },
  {
    value: 'United States of America',
    label: 'United States of America',
  },
  {
    value: 'Japan',
    label: 'Japan',
  },
  {
    value: 'South Korea',
    label: 'South Korea',
  },
];
const useStyles = theme => ({
  mainStyle:{
    margin:theme.spacing(14),
    height:'auto',
  },
  headeing1:{
    fontSize:'32px'
  },
  fixed:{
    position:'fixed'
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    
  },
})

export class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id:'',
      first_name: '',
      last_name: '',
      address: '',
      email: '',
      city: '',
      country: '',
      zipcode: '',
      gcash_number: '',
      paypal_email: '',
      error: '',
      bank_account: '',
      bank_name: '',
      avatars: {},
      dataImg:'',
      password:'',
      address_state:''
    }
    this.handleOnChange = this
      .handleOnChange
      .bind(this)
  }

  handleOnChange = input => (event) => {
    if (event.target.type === 'file') {
    
     
      // console.log(reader.readAsDataURL(input.files[0]));
        // console.log(reader.readAsDataURL(event.target.files[0]));
        try {
          this.setState({
            avatars: event.target.files[0],
            dataImg:URL.createObjectURL(event.target.files[0])
          })
          
        } catch (error) {
          console.log(error)
        }
      
      
  // 

    }
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    
    // axios.get(`${strapi}/users/?username=${this.props.match.params.username}`)
    axios({
      url:'/editprofile',
      method:'post',
      withCredentials:true,
      data:{
        username:this.props.match.params.username
      }
    })
    .then(res => {
      console.log(res.data)
      this.setState({
        id:res.data[0].id,
        email: res.data[0].email,
        gcash_number: res.data[0].gcash_number,
        paypal_email: res.data[0].paypal_email,
        first_name: res.data[0].first_name,
        last_name: res.data[0].last_name,
        address: res.data[0].address,
        city: res.data[0].city,
        country: res.data[0].country,
        zipcode: res.data[0].zipcode,
        address_state: res.data[0].address_state,
        bank_name: res.data[0].bank_name,
        bank_account: res.data[0].bank_account,
        // avatar: res.data[0].avatar.url
      })
      if(res.data[0].avatar === null){
        this.setState({
          
          avatar: ''
        })
      }else{
        this.setState({
          
          avatar: res.data[0].avatar.url
        })
      }
      
    }).catch(err => {
      console.log(err.response.data.message)
    })
  }

  handleOnSubmit = (event) => {
    const {
      first_name,
      last_name,
      address,
      city,
      country,
      zipcode,
      gcash_number,
      paypal_email,
      bank_account,
      bank_name,
      password,
      address_state
    } = this.state
    event.preventDefault();
    let data = {}
    if(password.length <= 0){
       data = {
        first_name,
        last_name,
        address,
        city,
        country,
        zipcode,
        gcash_number,
        paypal_email,
        bank_account,
        bank_name,
        address_state
      };
    }else{
       data = {
            first_name,
            last_name,
            address,
            city,
            country,
            zipcode,
            gcash_number,
            paypal_email,
            bank_account,
            bank_name,
            password,
            address_state
          };
    }
    
//move to backend
    axios.put(`${strapi}/users/${this.state.id}`, {
      headers: {
        'Content-type': 'application/json',
        'Cookie':'access_token'
        // 'Authorization':`Bearer ${withToken()}`
      }
    }, {data}).then(res => {
      console.log(res)
      let bodyFormData = new FormData();
      bodyFormData.append("files", this.state.avatars, this.state.avatars.name)
      bodyFormData.append("ref", "user")
      bodyFormData.append("refId", this.state.id)
      bodyFormData.append("field", "avatar")
      bodyFormData.append("source", "users-permissions")
      axios({
        method: 'post',
        url: `${strapi}/upload`,
        data: bodyFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Authorization': `Bearer ${withToken()}`
        }
      }).then(res => {
        // console.log(res.data)
        window.location.href = `/profile/${this.props.match.params.username}`
      }).catch(err => {
        console.log(err.response.data.message)
      })
    }).catch(err => {
      window.location.href = `/profile/${this.props.match.params.username}`
      // console.log(data)
      // console.log(err.response)
      console.log(err)
    })
  }
  
  scrollToview = (event) => {
    event.preventDefault();
    if(event.currentTarget.value === 'personalinfo'){
      window.scrollTo(0,0)
    }else{
      let element = document.getElementById(event.currentTarget.value)
      element.scrollIntoView();
    }
    // console.log(document.getElementById(event.currentTarget.value))
    
  }
  render() {
    const {classes} = this.props
    const {
      first_name,
      last_name,
      address,
      city,
      country,
      zipcode,
      gcash_number,
      paypal_email,
      bank_account,
      bank_name,
      avatar,
      dataImg,
      address_state
    } = this.state
    console.log(dataImg)
    return (
      <Fragment>
        <Navbar/>
        <main className={classes.mainStyle}>
        <Grid container direction='row'>
          <Grid item sm={4} >
            <div className={classes.fixed}>
            <Typography>
          <Button value='personalinfo' onClick={this.scrollToview}>Personal Information</Button>
          </Typography>
          <Typography>
          <Button value='paymentoptions' onClick={this.scrollToview}>Payment Options</Button>
          </Typography>
          <Typography>
          <Button value='accountsettings' onClick={this.scrollToview}>Account Settings</Button>
          </Typography>
            </div>
          
          </Grid>
          <Grid item container sm={8} direction='column' >
          <form onSubmit={this.handleOnSubmit} style={{width:'60%'}}>
          
          
              <section id='personalinfo'>
              <Typography variant='h6' fullWidth>
                Personal Information
                <Divider/>
              </Typography>
              <br/>
              <Grid container item direction='row' alignItems='center' spacing={2}>
              <Grid item sm={3}>
              <Avatar alt={`${first_name} ${last_name}`} 
              // src="/static/images/avatar/1.jpg" 
              id="output_image"
              src={(dataImg !== '') ? `${dataImg}` : `${avatar}`}
              // src={dataImg}
              
              className={classes.large} 
              
              />
              </Grid>
              <Grid item sm={9}>
              <input
            accept="image/*"
            className={classes.input}
            name="avatar"
            id="contained-button-file"
            onChange={this.handleOnChange('avatar')}
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
          {/* <input
                    type='file'
                    name="avatar"
                    className="form-control-file form-control-sm"
                    onChange={this.handleOnChange('avatar')}/> */}
              </Grid>
              
              </Grid>
              <br/>
              <Grid item container spacing={2}>
              <Grid item sm={6}>
                <TextField
                  label='First Name'
                  variant='outlined'
                  fullWidth
                  name='first_name'
                    onChange={this.handleOnChange()}
                    value={first_name}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  label='Last Name'
                  variant='outlined'
                  fullWidth
                  name='last_name'
                  onChange={this.handleOnChange()}
                    value={last_name}
                />
              </Grid>
              </Grid>
              <br/>
              <Grid item container spacing={2}>
              <Grid item sm={12}>
                <TextField
                  label='Address'
                  variant='outlined'
                  fullWidth
                  name='address'
                  onChange={this.handleOnChange()}
                    value={address}
                />
              </Grid>
              </Grid>
              <br/>
              <Grid item container spacing={2}>
              <Grid item sm={4}>
                <TextField
                  label='City'
                  variant='outlined'
                  fullWidth
                  name='city'
                  onChange={this.handleOnChange()}
                    value={city}
                />
              </Grid>
              <Grid item sm={4}>
                {/* <TextField
                  label='State/Province'
                  variant='outlined'
                  fullWidth
                  name='address_state'
                  value={address_state}
                  onChange={this.handleOnChange()}
                    
                /> */}
                <TextField
                  label='State/Province'
                  variant='outlined'
                  fullWidth
                  name='address_state'
                  onChange={this.handleOnChange()}
                    value={address_state}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  label='Zip Code'
                  variant='outlined'
                  fullWidth
                  name='zipcode'
                  onChange={this.handleOnChange()}
                    value={zipcode}
                />
              </Grid>
          </Grid>
          <br/>
          <Grid item container spacing={2}>
          
          <Grid item sm={12}>
          <TextField
                        id="outlined-select-currency"
                        select
                        name='country'
                        label="Country"
                        value={country}
                        onChange={this.handleOnChange()}
                        variant="outlined"
                        fullWidth
                      >
                        {countries.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
          </Grid>
          
          </Grid>
          
          </section>
            
          
          <br/><br/>

          
          
          <section id='paymentoptions'>
              <Typography variant='h6' fullWidth>
                Payment Options
                <Divider/>
              </Typography>
              <br/>
              <Grid item container spacing={2}>
              <Grid item sm={12}>
                <TextField
                  label='Paypal Email'
                  variant='outlined'
                  fullWidth
                  type='email'
                  name='paypal_email'
                    value={paypal_email}
                    onChange={this.handleOnChange()}
                />
              </Grid>
              
              </Grid>
              <br/>
              <Grid item container spacing={2}>
              <Grid item sm={6}>
                <TextField
                  label='Bank Name'
                  variant='outlined'
                  fullWidth
                  name='bank_name'
                    value={bank_name}
                    onChange={this.handleOnChange()}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  label='Account No.'
                  variant='outlined'
                  fullWidth
                  name='bank_name'
                    value={bank_account}
                    onChange={this.handleOnChange()}
                />
              </Grid>
              
              </Grid>
              <br/>
              <Grid item container spacing={2}>
              <Grid item sm={12}>
                <TextField
                  label='Gcash No.'
                  variant='outlined'
                  fullWidth
                  helperText='You can use gcash if you live in the Philippines'
                  name='gcash_number'
                    value={gcash_number}
                    onChange={this.handleOnChange()}
                />
              </Grid>
              
              </Grid>
              <br/>
              
          </section>
            
          
          
          <section id='accountsettings'>
          <Typography variant='h6' fullWidth>
                Account Settings
                <Divider/>
              </Typography>
              <br/>
              <Grid item container spacing={2}>
              <Grid item sm={12}>
                <TextField
                  label='New Password'
                  variant='outlined'
                  fullWidth
                  type='password'
                  helperText="Leave blank if you don't want to change password"
                  name='password'
                  onChange={this.handleOnChange()}
                />
              </Grid>
              </Grid>
          </section>
          <br/>
            <Grid item container direction='row' justify='space-between'>
                <Grid item sm={4}>
                          <Button href={`/profile/${this.props.match.params.username}`} variant='contained' color='secondary' fullWidth>Cancel</Button>
                </Grid>
                <Grid item sm={4}>
                          <Button type='submit' variant='contained' color='primary' fullWidth>Save</Button>
                </Grid>
            </Grid>
            
          
            
           
          </form>
          </Grid>
        </Grid>
          {/* <div className='container'>
            <h2>Edit Profile</h2>
            <form onSubmit={this.handleOnSubmit}>
              <div className='row mb-3'>
                <div className='col-sm-auto'>
                  <label htmlFor='avatar'>Avatar</label>
                  <input
                    type='file'
                    name="avatar"
                    className="form-control-file form-control-sm"
                    onChange={this.handleOnChange('avatar')}/>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-sm-6 mb-3'>
                  <label htmlFor='gcash_number'>GCASH Number</label>
                  <input
                    type='text'
                    className='form-control'
                    name='gcash_number'
                    value={gcash_number}
                    onChange={this.handleOnChange()}
                    placeholder='+639XXXXXXXXX'/>
                </div>
                <div className='col-sm-6 mb-3'>
                  <label htmlFor='paypal_email'>Paypal Email</label>
                  <input
                    type='text'
                    
                    className='form-control'name='paypal_email'
                    value={paypal_email}
                    onChange={this.handleOnChange()}
                    placeholder='johndoe@email.com'/>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-sm-6 mb-3'>
                  <label htmlFor='bank_name'>Bank Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='bank_name'
                    value={bank_name}
                    onChange={this.handleOnChange()}
                    placeholder=''/>
                </div>
                <div className='col-sm-6 mb-3'>
                  <label htmlFor='bank_account'>Bank Account</label>
                  <input
                    type='text'
                    name='bank_account'
                    className='form-control'
                    value={bank_account}
                    onChange={this.handleOnChange()}
                    placeholder=''/>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-6 mb-3'>
                  <label htmlFor='first_name'>First Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='first_name'
                    onChange={this.handleOnChange()}
                    value={first_name}
                    placeholder='First Name'/>
                </div>
                <div className='col-sm-6 mb-3'>
                  <label htmlFor='last_name'>Last Name</label>
                  <input
                    type='text'
                    name='last_name'
                    className='form-control'
                    value={last_name}
                    onChange={this.handleOnChange()}
                    placeholder='Last Name'/>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-6 mb-3'>
                  <label htmlFor='address'>Address</label>
                  <input
                    type='text'
                    name='address'
                    className='form-control'
                    value={address}
                    onChange={this.handleOnChange()}
                    placeholder='Address'/>
                </div>
                <div className='col-sm-6 mb-3'>
                  <label htmlFor='city'>City / State</label>
                  <input
                    type='text'
                    name='city'
                    className='form-control'
                    value={city}
                    onChange={this.handleOnChange()}
                    placeholder='City/State'/>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-6 mb-3'>
                  <label htmlFor='zipcode'>Zip Code</label>
                  <input
                    type='number'
                    name='zipcode'
                    className='form-control'
                    value={zipcode}
                    onChange={this.handleOnChange()}
                    placeholder='Zip Code'/>
                </div>
                <div className='col-sm-6 mb-3'>
                  <label htmlFor='country'>Country</label>
                  <select
                    className='form-control'
                    name="country"
                    value={country}
                    onChange={this.handleOnChange()}>
                    <option value="">Country</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Åland Islands">Åland Islands</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cote D'ivoire">Cote D'ivoire</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">French Southern Territories</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-bissau">Guinea-bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                    <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                    <option value="Korea, Republic of">Korea, Republic of</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macao">Macao</option>
                    <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                    <option value="Moldova, Republic of">Moldova, Republic of</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">Russian Federation</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Helena">Saint Helena</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                    <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                    <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Timor-leste">Timor-leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Viet Nam">Viet Nam</option>
                    <option value="Virgin Islands, British">Virgin Islands, British</option>
                    <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                </div>
              </div>

              <button className='btn btn-primary mr-3'>Submit</button>

              <Link to={`/profile/${this.props.match.params.username}`}>Cancel</Link>
            </form>
          </div> */}
        </main>

      </Fragment>
    );
  }
}

export default withStyles(useStyles)(EditProfile);

import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {strapi} from '../functions'
export class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      paypal_email: '',
      gcash_number: '',
      first_name: '',
      last_name: '',
      email: '',
      address: '',
      city: '',
      zipcode: '',
      country: 'Philippines',
      username: '',
      password: '',
      bank_account: '',
      bank_name: '',
      errors: [],
      isLoading: false,
      noErrors: false,
      axiosError: '',
      sent: false
    }
    this.handleOnChange = this
      .handleOnChange
      .bind(this)
    this.OnSuccess = this.OnSuccess.bind(this)
  }

  removeItem = (item) => {
    for (var i = 0; i < this.state.errors.length; i++) {
      if (this.state.errors[i] === item) {
        this
          .state
          .errors
          .splice(i, 1);
      }
    }
  }

  checkCountry = () => {
    if (this.state.country === 'Philippines') {
      this.removeItem('Enter Paypal Email')
      if (this.state.gcash_number.length <= 0) {
        if (!this.state.errors.includes('Enter Gcash Number')) {
          this
            .state
            .errors
            .push('Enter Gcash Number')
        }
        this.setState({isLoading: false})
      } else {
        this.removeItem('Enter Gcash Number')
      }
    } else {
      this.removeItem('Enter Gcash Number')
      if (this.state.paypal_email.length <= 0) {
        if (!this.state.errors.includes('Enter Paypal Email')) {
          this
            .state
            .errors
            .push('Enter Paypal Email')
        }
        this.setState({isLoading: false})
      } else {
        this.removeItem('Enter Paypal Email')
      }
    }
  }

  OnSuccess = () => {
    this.props.handleOnSuccess()
  }

  continue = (e) => {
    console.log(this.state)
    e.preventDefault();
    if (this.state.first_name.length > 0 && this.state.last_name.length > 0 && this.state.email.length > 0 && this.state.address.length > 0 && this.state.city.length > 0 && this.state.zipcode.length > 0 && this.state.country.length > 0 && this.state.username.length > 0 && this.state.password.length > 0) {
      const data = {
        paypal_email: this.state.paypal_email,
      gcash_number: this.state.gcash_number,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      zipcode: this.state.zipcode,
      country: this.state.country,
      username: this.state.username,
      password: this.state.password,
      bank_account: this.state.bank_account,
      bank_name: this.state.bank_name,
      confirmed:false
      }
      this.setState({errors: []})
      
      axios
        .post(`${strapi}/users`, data)
        .then(res => {
          
          axios.post(`${strapi}/auth/send-email-confirmation`, {
            email: this.state.email
          }, {
            headers: {
              'Content-type': 'application/json'
            }
          }).then(res => {
            // Handle success.
            console.log(res.data);
            alert('sent')
            this.OnSuccess();
            // this.setState({sent: true})
            
          }).catch(error => {
            // Handle error.
            console.log('An error occured:', error.response);
          });
        })
        .catch(err => {
          this.setState({axiosError: err})
        })
    } else {
      if (this.state.first_name.length <= 0) {
        if (!this.state.errors.includes('Enter First Name')) {
          this
            .state
            .errors
            .push('Enter First Name')
        }
        this.setState({isLoading: false})
      } else {
        this.removeItem('Enter First Name')
      }
      if (this.state.last_name.length <= 0) {
        if (!this.state.errors.includes('Enter Last Name')) {
          this
            .state
            .errors
            .push('Enter Last Name')
        }
        this.setState({isLoading: false})
      } else {
        this.removeItem('Enter Last Name')
      }
      if (this.state.email.length <= 0) {
        if (!this.state.errors.includes('Enter Email')) {
          this
            .state
            .errors
            .push('Enter Email')
        }
        this.setState({isLoading: false})
      } else {
        this.removeItem('Enter Email')
      }
      if (this.state.address.length <= 0) {
        if (!this.state.errors.includes('Enter Address')) {
          this
            .state
            .errors
            .push('Enter Address')
        }
        this.setState({isLoading: false})
      } else {
        this.removeItem('Enter Address')
      }
      if (this.state.city.length <= 0) {
        if (!this.state.errors.includes('Enter City')) {
          this
            .state
            .errors
            .push('Enter City')
        }
        this.setState({isLoading: false})
      } else {
        this.removeItem('Enter City')
      }
      if (this.state.zipcode.length <= 0) {
        if (!this.state.errors.includes('Enter Zip Code')) {
          this
            .state
            .errors
            .push('Enter Zip Code')
        }
        this.setState({isLoading: false})
      } else {
        this.removeItem('Enter Zip Code')
      }

      if (this.state.username.length <= 0) {
        if (!this.state.errors.includes('Enter Username')) {
          this
            .state
            .errors
            .push('Enter Username')
        }
        this.setState({isLoading: false})
      } else {
        this.removeItem('Enter Username')
      }
      if (this.state.password.length <= 0) {
        if (!this.state.errors.includes('Enter Password')) {
          this
            .state
            .errors
            .push('Enter Password')
        }
        this.setState({isLoading: false})
      } else {
        this.removeItem('Enter Password')
      }
      if (this.state.country.length <= 0) {
        if (!this.state.errors.includes('Enter Country')) {
          this
            .state
            .errors
            .push('Enter Country')
        }
        this.setState({isLoading: false})
      } else {
        this.checkCountry();
        this.removeItem('Enter Country')
      }
    }

  }

  showInputs = () => {
    switch (this.state.country) {
      case 'Philippines':
        return (
          <Fragment>
            <div className=' mb-3'>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="gcash_number">GCash</label>
                </div>
                <input
                  className='form-control form-control-sm'
                  type='text'
                  placeholder='+639XXXXXXXXX'
                  name="gcash_number"
                  value={this.state.gcash_number}
                  onChange={this.handleOnChange}/>
                <span
                  className="d-inline-block"
                  data-toggle="tooltip"
                  title='insert tooltip for gcash'>
                  <img
                    src="https://img.icons8.com/material-rounded/18/000000/help.png"
                    alt='help-icon'/>
                </span>
              </div>
              <small className="form-text text-muted">
                If you lived in the Philippines, you only need GCASH Number
              </small>
            </div>
          </Fragment>
        )

      default:
        return ''
        break
    }
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {

    return (
      
      <Fragment>
        <h1>Sign Up</h1>
        <p>Register to create a campaign</p>
        {(this.state.axiosError.length > 0)
          ? <div className="alert alert-warning" role="alert">{this.state.axiosError}</div>
          : ''}
        {(this.state.errors.length > 0)
          ? <div className="alert alert-danger" role="alert">{this
                .state
                .errors
                .map(error => (
                  <div key={error.id}>{error}</div>
                ))}</div>
          : ''}
        <form>
          <div className='row'>
            <div className="col-sm">

              <label htmlFor='country'>Country:</label>
              <input
                list="country-list"
                name="country"
                className="form-control form-control-sm"
                onChange={this.handleOnChange}
                value={this.state.country}
                placeholder='Philippines'/>

              <datalist id="country-list">
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
              </datalist>
            </div>
          </div>
          <div className='row'>

            <div className='col-sm'>
              <label htmlFor='country'>Payment:</label>
              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="paypal_email">Paypal</label>
                </div>
                <input
                  className='form-control form-control-sm'
                  type='text'
                  placeholder='johndoe@email.com'
                  name="paypal_email"
                  value={this.state.paypal_email}
                  onChange={this.handleOnChange}/>
                <span
                  className="d-inline-block"
                  data-toggle="tooltip"
                  title='insert tooltip for paypal'>
                  <img
                    src="https://img.icons8.com/material-rounded/18/000000/help.png"
                    alt='help-icon'/>
                </span>
              </div>
              {this.showInputs()}
              <label htmlFor='country'>Bank (optional):</label>
              <span
                className="d-inline-block"
                data-toggle="tooltip"
                title='insert tooltip for bank'>
                <img
                  src="https://img.icons8.com/material-rounded/18/000000/help.png"
                  alt='help-icon'/>
              </span>

              <input
                className='form-control form-control-sm mb-3'
                type='text'
                placeholder='Bank Name'
                name="bank_name"
                value={this.state.bank_name}
                onChange={this.handleOnChange}/>

              <input
                className='form-control form-control-sm mb-2'
                type='text'
                placeholder='Bank Account'
                name="bank_account"
                value={this.state.bank_account}
                onChange={this.handleOnChange}/>
            </div>
          </div>

          <div className='row'>
            <div className="col-sm">
              <label htmlFor='username'>Username</label>

              <input
                className='form-control form-control-sm'
                type='text'
                placeholder='johndoe'
                name="username"
                onChange={this.handleOnChange}/>

            </div>
            <div className="col-sm">

              <label htmlFor='password'>Password</label>
              <input
                className='form-control form-control-sm'
                type='password'
                placeholder='********'
                name="password"
                onChange={this.handleOnChange}/>
            </div>

          </div>
          <div className='row'>
            <div className="col-sm">

              <label htmlFor='email'>Email</label>
              <input
                className='form-control form-control-sm'
                type='email'
                placeholder='johndoe@email.com'
                name="email"
                onChange={this.handleOnChange}/>

            </div>

          </div>

          <div className='row'>
            <div className="col-sm">
              <label htmlFor='first_name'>First Name</label>
              <input
                className='form-control form-control-sm'
                type='text'
                placeholder='John'
                name="first_name"
                onChange={this.handleOnChange}/>

            </div>
            <div className="col-sm">

              <label htmlFor='last_name'>Last Name:</label>
              <input
                className='form-control form-control-sm'
                type='text'
                placeholder='Doe'
                name="last_name"
                onChange={this.handleOnChange}/>

            </div>

          </div>
          <div className='row'>
            <div className="col-sm">

              <label htmlFor='address'>Address:</label>
              <input
                className='form-control form-control-sm'
                type='text'
                placeholder='123 Street Rd'
                name="address"
                onChange={this.handleOnChange}/>

            </div>

          </div>
          <div className='row'>
            <div className="col-sm">

              <label htmlFor='city'>City/State:</label>
              <input
                className='form-control form-control-sm'
                type='text'
                placeholder='City/State'
                name="city"
                onChange={this.handleOnChange}/>

            </div>
            <div className="col-sm">

              <label htmlFor='zipcode'>Zip Code:</label>
              <input
                className='form-control form-control-sm'
                type='number'
                placeholder='1234'
                name="zipcode"
                onChange={this.handleOnChange}/>

            </div>

          </div>
          <div className='row'>
            <div className="col-sm">
              <Link to="#">Need Help?</Link>
            </div>
            <div className="col-sm">
              <button className='btn btn-primary w-100' onClick={this.continue}>Continue</button>
            </div>

          </div>
        </form>
      </Fragment>
    );
  }
}

export default Registration;

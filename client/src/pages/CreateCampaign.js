import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import {strapi, getUserName, withToken} from '../components/functions'
import Navbar from '../components/Home/Navbar';
import Success from './Success'
import { LoggedInContext } from '../contexts/LoggedInContext';
export class CreateCampaign extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
      title: '',
      description: '',
      goalFund: '',
      author: {},
      reference: Math.floor(Math.random() * 31415926),
      username: '',
      images: {},
      currency:'USD',
      isSuccess:false,
      response:{}
    }
  }


  handleChange = input => e => {

    if (e.target.type === 'file') {
      this.setState({images: e.target.files[0]})
      console.log(e.target.files[0])
    }
    this.setState({[input]: e.target.value})
  }

  getUser = () => {
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

    console.log(datas)
    var data = new FormData();

    data.append('files.image', this.state.images, this.state.images.name)
    data.append('data', JSON.stringify(datas));
    console.log(JSON.stringify(datas))

    //move to backend
    axios({
      method: 'post',
      url: `${strapi}/campaigns`,
      data:data,
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
    console.log(this.state)
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.getUser();
  }
  
  render() {
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
          <main>
            <div className='container'>
            {loggedin ? <Link to={'/feed'}>Go Back</Link> : ''}
              <h1>Create A Campaign
              </h1>
              <form onSubmit={this.onFormSubmit}>
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
                    {/* <h6>Description:</h6> */}
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
                    {/* <h6>Description:</h6> */}
                  
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
                  <div className="col-md-9 mb-3">
                    <Link to="/help">Need Help?</Link>
                  </div>
                  <div className="col-md-3">
                    <button className='btn btn-warning w-100'>Submit</button>
                  </div>
  
                </div>
              </form>
            </div>
  
          </main>
        </Fragment>
      );
    }
      
    }}

    </LoggedInContext.Consumer>
    );
    
    
    
  }
}

export default CreateCampaign;
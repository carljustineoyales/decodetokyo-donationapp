import React, {Component, Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';
import {strapi, getUserName,withToken} from '../components/functions'
import Navbar from '../components/Home/Navbar';
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
      images: {}

    }
    
  }

  handleChange = input => e => {
    
    if (e.target.type === 'file') {
      this.setState({
        images:e.target.files[0]
      })
      console.log(e.target.files[0])
    } 
    this.setState({[input]: e.target.value})
  }

  getUser = () => {
    axios.get(`${strapi}/users/?username=${getUserName()}`).then(res => {
      
      this.setState({
        author: {
          id: res.data[0].id
        },
        username: getUserName()
      })
      
      this.postCampaign();
    }).catch(err => {
      console.log(err)
    })

  }

  postCampaign = () => {
console.log('postCampaign')
const data = {
  'title':this.state.title,
  'description': this.state.description,
  'author': this.state.author,
  'reference':this.state.reference,
  'goal':this.state.goalFund,
  'verified':false,
  'deleted':false,
  'raised':0,
  'username':this.state.username
};
    // const data = this.state
    
    console.log(data)
    var bodyFormData = new FormData();
    
    bodyFormData.append('files.image',this.state.images, this.state.images.name)
    bodyFormData.append('data', JSON.stringify(data));
    console.log(data)

    axios({
      method: 'post',
      url: `${strapi}/campaigns`,
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${withToken()}`
       }
      })
      .then(function (response) {
        window.location.href = "/success";
          console.log(response);
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      });
    console.log(this.state)
  }

  onFormSubmit = (event) => {
    
    event.preventDefault();
  
    this.getUser();

  }

  render() {
    const {title, description, goalFund} = this.state
    const values = {
      title,
      description,
      goalFund
    }
    return (
      <Fragment>
        <Navbar/>
        <main>
          <div className='container'>
            <h1>Create A Campaign </h1>
            <form onSubmit={this.onFormSubmit}>
              <div className='form-row '>
                <div className="col-md-12 mb-3">
                <label for='Title'>Title <img src="https://img.icons8.com/material-rounded/18/000000/help.png" alt='help-icon'/></label>
                    <input
                      className='form-control form-control-sm'
                      type='text'

                      onChange={this.handleChange('title')}
                      value={values.title}/>
                  
                </div>

              </div>
              <div className='form-row'>
                <div className="col-md-12 mb-3">
                <label for='Description'>Description <img src="https://img.icons8.com/material-rounded/18/000000/help.png" alt='help-icon'/></label>
                    {/* <h6>Description:</h6> */}
                    <textarea
                      className="form-control form-control-sm"
                      
                      rows="12"
                      onChange={this.handleChange('description')}
                      value={values.description}></textarea>
                  
                </div>

              </div>
              <div className='form-row'>
                <div className="col-md-12 mb-3">
                <label for='Goal'>Funding Goal Amount <img src="https://img.icons8.com/material-rounded/18/000000/help.png" alt='help-icon'/></label>
                    <input
                      type='number'
                      className="form-control form-control-sm"
                      placeholder='Funding Goal Amount'
                      onChange={this.handleChange('goalFund')}
                      value={values.goalFund}/>
                  
                </div>

              </div>
              <div className='form-row'>
                <div className="col-md-12 mb-3">
                <label for='image'>Image <img src="https://img.icons8.com/material-rounded/18/000000/help.png" alt='help-icon'/></label>
                    <input
                      type='file'
                      className="form-control-file form-control-sm"
                      onChange={this.handleChange('image')}
                      value={values.image}/>
                  
                </div>

              </div>
              <div className='form-row '>
                <div className="col-md-9 mb-3">
                  <Link to="#">Need Help?</Link>
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
}

export default CreateCampaign;
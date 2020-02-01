import React, {Component, Fragment} from 'react';
import Navbar from '../components/Home/Navbar';
import {strapi} from '../components/functions';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile_data: [],
      error: ''
    }
  }

  componentDidMount() {

    axios
      .get(`${strapi}/users/?id=${this.props.match.params.id}`)
      .then(res =>{this.setState({profile_data: res.data})})
      .catch(err => {
        console.log(err.response.data.message)
      })
      
  }

  render() {
    const {profile_data} = this.state
    // console.log(this.state.profile_data)
    return (
      <Fragment>
        <Navbar/>
        <main>
          <div className='container'>
          {
        profile_data.map(data=>(
          
          <div key={data.id}>
          <Link to={`/profile-edit/${this.props.match.params.id}`}>Edit Profile</Link>
          <h2>{data.first_name} {data.last_name}</h2>
          <h4>{data.email}</h4>
          <h4>@{data.username}</h4>
          <br/>
          <p>{data.address} {data.city} {data.zipcode} {data.country}</p>
          <h3>Posted Campaigns</h3>
          {
            data.campaigns.map(campaign=>(
              <div key={campaign.id}>
              <hr/>
              <h3>{campaign.title}</h3>
              <h5>{campaign.goal}</h5>
             
              {
            (campaign.description.length > 50) ? (<p className="card-text">{campaign.description.split(" ").slice(0,50).join(" ")} [...]</p>) : (<p className="card-text">{campaign.description}</p>)
          }
                {
                  (campaign.deleted) ? <h3>Deleted</h3> : (campaign.verified ? <h3>Verified</h3> : <h3>Pending</h3>) 
                }
              
              <Link to={`/campaign/${campaign.id}`}>Read More..</Link>
              </div>
            ))
          }
          </div>
        ))
      }
          </div>
        </main>
     
      </Fragment>
    );
  }
}

export default Profile;

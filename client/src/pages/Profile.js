import React, {Component, Fragment} from 'react';
import Navbar from '../components/Home/Navbar';
import {strapi, getId, withToken} from '../components/functions';
import axios from 'axios';
import {Link} from 'react-router-dom';

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
      .then(res => {
        console.log(res.data)
        this.setState({profile_data: res.data})
      })
      .catch(err => {
        console.log(err.response.data.message)
      })

  }

  render() {
    console.log(this.state)
    const {profile_data} = this.state
    // console.log(this.state.profile_data)
    return (
      <Fragment>
        <Navbar/>
        <main>
          <div className='container'>
            {profile_data.map(data => (

              <div key={data.id}>
                {getId() !== this.props.match.params.id
                  ? <Link to={'/feed'}  style={{
                    display: 'block'
                  }}>Go Back</Link>
                  : (<>
                    <Link to={'/feed'}  style={{
                    display: 'block'
                  }}>Go Back</Link>
                    <Link
                    to={`/edit/${this.props.match.params.id}`}
                    style={{
                    display: 'block'
                  }}>Edit Profile</Link>
                  </>)
}
                {/* <img src={} /> */}
                {data.avatar === null
                  ? (<img
                    src={`https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg`}
                    width="65px"
                    alt={`https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg`}
                    style={{
                    borderRadius: '100%'
                  }}/>)
                  : (<img
                    src={`${strapi}${data.avatar.url}`}
                    style={{
                    borderRadius: '50%'
                  }}
                    alt={`${data.avatar.id}`}
                    width="100px"
                    height="100px"/>)
}
                <h2>{data.first_name} {data.last_name}</h2>
                <h4>{data.email}</h4>
                <h4>@{data.username}</h4>
                <br/>
                <p>{data.address} {data.city}, {data.zipcode}, {data.country}</p>
                <h3>Posted Campaigns</h3>
                {data
                  .campaigns
                  .map(campaign => (
                    <div key={campaign.id}>
                      <hr/>
                      {
                        (withToken() && getId() === this.props.match.params.id) ? <Link to={`/checkout/${campaign.id}`}>Checkout</Link> : ''
                      }
                      
                      <h3>{campaign.title}</h3>
                      <h5>{campaign.goal}</h5>

                      {(campaign.description.length > 50)
                        ? (
                          <p
                            className="card-text"
                            style={{
                            wordBreak: 'break-word'
                          }}>{campaign
                              .description
                              .split(" ")
                              .slice(0, 50)
                              .join(" ")}
                            [...]</p>
                        )
                        : (
                          <p
                            className="card-text"
                            style={{
                            wordBreak: 'break-word'
                          }}>{campaign.description}</p>
                        )
}
                      {(campaign.deleted)
                        ? <h5>Deleted</h5>
                        : (campaign.verified
                          ? <h5>Verified</h5>
                          : <h5>Pending</h5>)
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

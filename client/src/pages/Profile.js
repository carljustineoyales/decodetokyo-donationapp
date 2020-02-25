import React, {Component, Fragment} from 'react';
import Navbar from '../components/Home/Navbar';
import {strapi, withToken,getUserName} from '../components/functions';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { LoggedInContext } from '../contexts/LoggedInContext';

export class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile_data: [],
      error: ''
    }
    this.goBack = this.goBack.bind(this); 
  }


  componentDidMount() {

    // axios
    //   .get(`${strapi}/users/?username=${this.props.match.params.username}`)
    axios({
      url:'/getuserprofile',
      method:'post',
      withCredentials:true,
      data:{
        username:this.props.match.params.username
      }
    })
      .then(res => {
        console.log(res.data)
        this.setState({profile_data: res.data})

      })
      .catch(err => {
        console.log(err.response.data.message)
      })

  }

  
  
  goBack(){
    this.props.history.goBack();
}


  render() {
    console.log(this.state)
    const {profile_data} = this.state;
    // console.log(this.state.profile_data)
    return(
<LoggedInContext.Consumer>{(LoggedInContext)=>{
  const {username,loggedin} = LoggedInContext
return (
      <Fragment>
        <Navbar/>
        <main>
          <div className='container'>
            {profile_data.map(data => (

              <div key={data.id}>
                {username !== this.props.match.params.username
                  ?
                  (<button onClick={this.goBack}>Go Back</button>)
                  : (<>
                    <button onClick={this.goBack}>Go Back</button>
                    <Link
                    to={`/edit/${this.props.match.params.username}`}
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
                        (loggedin && username === this.props.match.params.username) ? ((campaign.requested) ? 
                         '':( <Fragment>
                          <Link to={`/checkout/${campaign.id}`}>Checkout</Link>
                          </Fragment>) 
                          ) : ''
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
                        : (campaign.requested) ? <h5>Checked Out</h5> : (campaign.verified
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
    }}
    
    </LoggedInContext.Consumer>
    );
    
  }
}

export default Profile;

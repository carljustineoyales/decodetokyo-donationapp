import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {strapi, getRole, getUserName, withToken} from '../components/functions';
import {Link} from 'react-router-dom';
import Navbar from '../components/Home/Navbar';
import { LoggedInContext } from '../contexts/LoggedInContext';

export class SingleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      title: '',
      goal: '',
      raised:0,
      description: '',
      username: '',
      id: '',
      author: [],
      error: '',
      deleted: false,
      verified: false,
      requested:false,
      supporters: [],
      currency:'',
      avatar:null,
      image:null
    }
    this.goBack = this.goBack.bind(this); 
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    
    // axios
    //   .get(`${strapi}/campaigns/${this.props.match.params.id}`)
    axios({
      url:'/getsinglecampaign',
      method:'post',
      withCredentials:true,
      data:{
        id:this.props.match.params.id
      }
    })
      .then(res => {
        console.log(res.data)
        if(res.data.author.avatar !== null || res.data.author.avatar === ''){
          this.setState({
            avatar:res.data.author.avatar.url,
          })
        }
        
        this.setState({
          id: res.data.id,
          title: res.data.title,
          goal: res.data.goal,
          description: res.data.description,
          author: res.data.author,
          username: res.data.author.username,
          deleted: res.data.deleted,
          verified: res.data.verified,
          requested:res.data.requested,
          supporters: res.data.supporters,
          currency:res.data.currency,
          raised:res.data.raised,
          // avatar:res.data.author.avatar.url,
          // image:res.data.image[0].url
        })
        console.log(res.data)
      })
      .catch(err => console.log(err))

  }

  toggleEditMode = (event) => {
    event.preventDefault();
    this.setState({
      editMode: !this.state.editMode,
      title: this.state.title,
      goal: this.state.goal,
      description: this.state.description
    })
  }

  handleOnChange = input => event => {
    this.setState({[input]: event.target.value})
  }

  refreshPage = (event) => {
    event.preventDefault();
    window.parent.location = window.parent.location.href
  }
  save = (event) => {
    event.preventDefault();
    const data = {
      title: this.state.title,
      goal: this.state.goal,
      description: this.state.description,
      verified: false
    }
    // axios
    // 
    //   .put(`${strapi}/campaigns/${this.props.match.params.id}`,{
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${withToken()}`
    //       }
    //   }, {data})
    axios({
      url:'/savesinglecampaign',
      method:'post',
      withCredentials:true,
      data:{
        id:this.props.match.params.id,
        title: this.state.title,
        goal: this.state.goal,
        description: this.state.description,
        verified: false
      }
    })
      .then(res => {
        console.log(res.data)
        window.parent.location = window.parent.location.href
      })
      .catch(err => {
        console.log(err.response.data.message)
      });
    
  }

  gcashInstructions = (event) => {
    event.preventDefault();
    alert('this is triggered using gcash button implement modal for gcash instruction')
  }

  cashPickUpInstrustions = (event) => {
    event.preventDefault();
    alert('this is triggered using cash pick up button implement modal for cash pick up ins' +
        'truction')
  }

  deleteCampaign = (event) => {
    const data = {
      verified: false,
      deleted: true
    }
    event.preventDefault();
    
    // axios
    //   .put(`${strapi}/campaigns/${this.props.match.params.id}`, data)
    axios({
      url:'/deletesinglecampaign',
      method:'post',
      withCredentials:true,
      data:{
        id:this.props.match.params.id,
        verified: false,
        deleted: true
      }
    })
      .then(res => {
        console.log(res.data)
        window.location.href = '/feed'
      })
      .catch(err => {
        console.log(err.response.data.message)
      });
    
  }

  goBack(){
    this.props.history.goBack();
}

  render() {
    console.log(this.state)
    const {
      editMode,
      title,
      goal,
      raised,
      description,
      deleted,
      verified,
      requested,
      author: {
        first_name,
        last_name,
        gcash_number,
      },
      username,
      currency,
      avatar,
      image
    } = this.state
    return (
      <LoggedInContext.Consumer>{(context)=>{
        const {loggedin,role} = context;
        
        return(
          <div>

<Navbar/>
<main>
  <div className='container'>

    {((context.username === username && loggedin) || role === 'admin')
      ? ((editMode)
        ? (
          <button className='btn btn-secondary' onClick={this.refreshPage}>Cancel</button>
        )
        : ((requested) ? '' : <button onClick={this.toggleEditMode} className='btn btn-primary'>Edit</button>))
      : ''
}
    <div>
      
      <button onClick={this.goBack}
       style={{
        display: "block"
       }}>Go Back</button>
      <div className="row">
        <div
          className="col-sm-9"
          style={{
          padding: "10px"
        }}>
        {(image === null || image === '') ? (
          <section
            style={{
            backgroundImage: "url(https://picsum.photos/seed/picsum/1000)",
            height: "20em",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
            backgroundSize: "cover"
          }}></section>
        ) : (
          <section
            style={{
            backgroundImage: "url(" + strapi + image + ")",
            height: "20em",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
            backgroundSize: "cover"
          }}></section>
          
        )}
         
          <div
            style={{
            backgroundColor: ' #fff',
            padding: "16px"
          }}>
            {editMode
              ? (
                <Fragment><input
                  type='text'
                  value={title}
                  className='form-control'
                  onChange={this.handleOnChange('title')}/><br/></Fragment>
              )
              : <h1>{title}</h1>
}
            {editMode
              ? <input
                  type='number'
                  className='form-control w-25'
                  value={goal}
                  onChange={this.handleOnChange('goal')}/>
              : <em><h6 className="text">Fund Goal: {currency} {goal}</h6></em>
}
          
            <h5 className="text">Fund Raised: <strong>{currency} {raised}</strong></h5>
            {(deleted) ? <h6>Status: Deleted</h6> : (requested) ? <h6>Status: Checkout Requested</h6> : (verified) ? <h6>Status: Active</h6>  : <h6>Status: Pending</h6>
}
          </div>
          <br/>
          <div
            style={{
            backgroundColor: ' #fff',
            padding: "16px"
          }}>
            {editMode
              ? <Fragment>
                  <textarea
                    rows="20"
                    className='form-control'
                    value={description}
                    onChange={this.handleOnChange('description')}></textarea><br/>
                </Fragment>
              : <p
                className="text"
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak:'break-word'
              }}>{description}</p>
}

            {editMode
              ? (
                <Fragment>
                  <button onClick={this.deleteCampaign} className='btn btn-danger'>Delete</button>
                  <button className='btn btn-warning' onClick={this.save}>Save</button>
                </Fragment>
              )
              : ''
}
          </div>
        </div>

        <div
          className="col-sm-3"
          style={{
          padding: "10px"
        }}>
        {(requested) ? '' : 
        (
          <div
            style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignContent: 'center',
            alignItems: 'center',
            height: '170px',
            backgroundColor: '#fff',
            marginBottom: '10px'
          }}>
            <div style={{
              width: '70%'
            }}>
              <Link
                to={`/donation/${this.props.match.params.id}`}
                className="btn btn-primary w-100">Paypal</Link>
                
            </div>
            {
              (gcash_number === null) ? '' : (
                <div style={{
              width: '70%'
            }}>
            <p style={{margin:'0'}}>Gcash: {gcash_number}</p>
            </div>
              )
            }
          </div>
        )
        }
          
          <div
            style={{
            backgroundColor: ' #fff',
            padding: '10px',
            marginBottom: '10px'
          }}>
            <ul
              style={{
              listStyle: 'none',
              padding: '0px',
              marginBottom: '0px'
            }}>
              <li>
                <div
                  style={{
                  display: 'flex',
                  flexFlow: 'column wrap',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: 'auto',
                  padding: '10px'
                }}>
                  <div className='row'>
                    <div className='col-4'>
                      <div
                        style={{
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'center'
                      }}>
                      { (avatar === '' || avatar === null ) ? (
                        <img
                          src={'https://upload.wikimedia.org/wikipedia/commons/2/24/Missing_avatar.svg'}
                          width="65px"
                          height="65px"
                          style={{
                          borderRadius: '100%'
                        }}/>
                      ) : (
                        <img
                          src={`${strapi}${avatar}`}
                          width="65px"
                          height="65px"
                          style={{
                          borderRadius: '100%'
                        }}/>
                      )}
                        
                      </div>
                    </div>
                    <div
                      className='col-8'
                      style={{
                      display: 'flex',
                      alignContent: 'center'
                    }}>
                      <div
                        style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'center',
                        justifyContent: 'center',
                        width: '160px'
                      }}>
                      
                        <h6
                          style={{
                          margin: '0px'
                        }}><Link to={`/profile/${username}`}>{first_name} {last_name}</Link></h6>
                        <p
                          style={{
                          margin: '0px'
                        }}>@{username}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</div>
        )
      }}</LoggedInContext.Consumer>
      
    );
  }
}

export default SingleCard;

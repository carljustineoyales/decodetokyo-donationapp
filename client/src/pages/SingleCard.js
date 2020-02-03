import  React  , {Component, Fragment}           from 'react'            ;
import  axios                                    from 'axios'            ;
import {strapi, getRole, getUserName, withToken} from '../components/functions'     ;
import {Link   }                                 from 'react-router-dom' ;
import  Navbar                                   from '../components/Home/Navbar'   ;
export class SingleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      title: '',
      goal: '',
      description: '',
      username: '',
      id: '',
      author: [],
      error: '',
      deleted: false,
      verified: false,
      supporters:[]
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    axios
      .get(`${strapi}/campaigns/${this.props.match.params.id}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          id: res.data.id,
          title: res.data.title,
          goal: res.data.goal,
          description: res.data.description,
          author: res.data.author,
          username: res.data.author.username,
          deleted: res.data.deleted,
          verified: res.data.verified,
          supporters:res.data.supporters
        })
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
    axios
      .put(`${strapi}/campaigns/${this.props.match.params.id}`, data)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.response.data.message)
      });
    window.parent.location = window.parent.location.href
  }

  gcashInstructions = (event) => {
    event.preventDefault();
    alert('this is triggered using gcash button implement modal for gcash instruction')
  }

  cashPickUpInstrustions = (event) => {
    event.preventDefault();
    alert('this is triggered using cash pick up button implement modal for cash pick up instruction')
  }

  deleteCampaign = (event) => {
    const data = {
      verified: false,
      deleted: true
    }
    event.preventDefault();
    axios
      .put(`${strapi}/campaigns/${this.props.match.params.id}`, data)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.response.data.message)
      });
    window.location.href = '/'
  }

  render() {
    console.log(this.state)
    const {
      editMode,
      title,
      goal,
      description,
      deleted,
      verified,
      author:{first_name, last_name},
      username,
      supporters
      // id
    } = this.state
    return (
      <div>
        <Navbar/>
        <main>
          <div className='container'>

            {((getUserName() === username && withToken()) || getRole() === 'admin')
              ? ((editMode)
                ? (
                  <button className='btn btn-secondary' onClick={this.refreshPage}>Cancel</button>
                )
                : <button onClick={this.toggleEditMode} className='btn btn-primary'>Edit</button>)
              : ''
}
            <div>
              <Link to={'/'} style={{
                display: "block"
              }}>Go back</Link>
              <div className="row">
                <div
                  className="col-sm-9"
                  style={{
                  padding: "10px"
                }}>
                  <section
                    style={{
                    backgroundImage: "url('https://picsum.photos/seed/picsum/720/300')",
                    height: "20em",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 50%",
                    backgroundSize: "cover"
                  }}></section>
                  <div
                    style={{
                    backgroundColor: ' #eee',
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
                      : <h2 className="text">{goal}</h2>
}
                    {(deleted)
                      ? <h6>Status: Deleted</h6>
                      : (verified)
                        ? <h6>Status: Active</h6>
                        : <h6>Status: Pending</h6>
}
                  </div>
                  <br/>
                  <div
                    style={{
                    backgroundColor: ' #eee',
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
                      : <p className="text">{description}</p>
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
                  <div
                    style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignContent: 'center',
                    alignItems: 'center',
                    height: '170px',
                    backgroundColor: '#eee',
                    marginBottom: '10px'
                  }}>
                    <div style={{
                      width: '70%'
                    }}>

                        <Link
                        to={`/donation/${this.props.match.params.id}`}
                        className="btn btn-primary w-100">Paypal</Link>

                    </div>
                    <div style={{
                      width: '70%'
                    }}>
                      <button onClick={this.gcashInstructions} className="btn btn-primary w-100">Gcash</button>
                    </div>
                    <div style={{
                      width: '70%'
                    }}>
                      <button onClick={this.cashPickUpInstrustions} className="btn btn-primary w-100">Cash on Pick Up</button>
                    </div>
                  </div>
                  <div
                    style={{
                    backgroundColor: ' #eee',
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
                                <img
                                  src='https://picsum.photos/seed/picsum/300'
                                  width="65px"
                                  style={{
                                  borderRadius: '100%'
                                }}/>
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
                                }}>{first_name} {last_name}</h6>
                                <p
                                  style={{
                                  margin: '0px'
                                }}>{username}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div
                    style={{
                    backgroundColor: ' #eee',
                    padding: '10px',
                    marginBottom: '10px'
                  }}>
                    <h4>Supporters</h4>
                    <ul
                    style={{
                      listStyle: 'none',
                      padding: '0px',
                      marginBottom: '0px'
                    }}
                    >
                    {supporters.map(supporter=>(
                      <li key={supporter.id}>
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
                                <img
                                  src='https://picsum.photos/seed/picsum/300'
                                  width="65px"
                                  style={{
                                  borderRadius: '100%'
                                }}/>
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
                                }}>{supporter.name}</h6>
                                <p
                                  style={{
                                  margin: '0px'
                                }}>${supporter.donation}</p>
                              </div>
                            </div>
                          </div></div>
                    </li>))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default SingleCard;

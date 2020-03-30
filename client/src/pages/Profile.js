import React, {Component, Fragment} from 'react';
import Navbar from '../components/Home/Navbar';
import {strapi, withToken,getUserName} from '../components/functions';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { LoggedInContext } from '../contexts/LoggedInContext';
import { Grid, Card, CardHeader, Avatar, Divider,Typography,CardContent,TextField, Box,CardMedia, CardActions,Button } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'
const useStyles = theme => ({
  mainStyle:{
    margin:theme.spacing(14),
    height:'auto',
  },
  avatar: {
    backgroundColor: 'grey',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  media: {
    height: 0,
    paddingTop: '50%', 
  },
  desc:{
    height:'160px',
    overflow:'hidden'
  },
  pd:{
    padding:theme.spacing(2)
  }
})
export class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profile_data: [],
      error: '',
      campaigns:[],
      filteredCampaigns:[]
    }
    this.goBack = this.goBack.bind(this); 
    this.handleOnChange = this.handleOnChange.bind(this)
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
        this.setState({
          profile_data: res.data,
          campaigns:res.data[0].campaigns,
          filteredCampaigns:res.data[0].campaigns,
          
        })

      })
      .catch(err => {
        console.log(err)
      })
      
  }

  
  
  goBack(){
    this.props.history.goBack();
}

  handleOnChange = (event) => {
    event.preventDefault();
    console.log(event.target.value)
    
    let filteredCampaigns = this.state.campaigns
    filteredCampaigns = filteredCampaigns.filter(campaign => {
      return campaign.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1
    })
    this.setState({
      filteredCampaigns
    })
  }

  render() {
    const {classes} = this.props
    console.log(this.state)
    const {profile_data} = this.state;
    // console.log(this.state.profile_data)
    return(
<LoggedInContext.Consumer>{(LoggedInContext)=>{
  const {username,loggedin} = LoggedInContext
return (
      <Fragment>
        <Navbar/>
        <main className={classes.mainStyle}>
         
         
          <Grid container sm={12}>
            <Grid item sm={3} className={classes.pd}>
              <Card>
             
              {profile_data.map(data => (

<Box key={data.id}>
  {username !== this.props.match.params.username
    ?
    (<Button color='secondary' onClick={this.goBack}>Feed</Button>)
    : (<>
      <Button  component='a' color='secondary' href='/feed'>Feed</Button>
      <Button
variant='contained' color='primary'
      component={Link}
      style={{color:'white'}}
      to={`/edit/${this.props.match.params.username}`}
      >Edit Profile</Button>
    </>)
}
<CardHeader
        avatar={
          (data.avatar === null) ? <Avatar className={classes.avatar,classes.large}/> : <Avatar aria-label="recipe" className={classes.avatar} src={`${data.avatar.url}`} className={classes.large}/>
        }
       
        title={`${data.first_name} ${data.last_name}`}
        titleTypographyProps={{variant:'h5'}}
        subheader={`@${data.username}`}
        subheaderTypographyProps={{variant:'body1'}}
      />
      <Divider/>
  <CardContent>
    <Typography variant='h6'>
        Personal Information
    </Typography>
    <br/>
    <Typography variant='h6'>
    Address: 
    <Typography variant='body1' style={{fontSize:'12px'}}>{data.address}, {data.city},{data.address_state}, {data.zipcode}, {data.country}</Typography>
    </Typography>
    <br/>
    <Typography variant='h6'>
    Email: 
    <Typography variant='body1' style={{fontSize:'12px'}}>{data.email}</Typography>
    </Typography>
    
    
  </CardContent>
  <Divider/>
</Box>
))
}
              </Card>
            </Grid>
            <Grid container sm={9}  direction='row' justify='space-around' className={classes.pd}>
            
            <Grid container item sm={12}  direction='row' style={{paddingBottom:'32px'}}>
              <Grid item sm={9} >
                <Typography variant='h4'>
                Created Campaigns
                </Typography>
                
                
              </Grid>
              <Grid item sm={3}>
                <TextField
                  label='Search Title'
                  variant='outlined'
                  type='text'
                  fullWidth
                  onChange={this.handleOnChange}
                />
                
              </Grid>
            </Grid>
            
            <Grid item container sm={12} spacing={2}>

            {this.state.filteredCampaigns.map(campaign => (
              <>
                    <Grid item sm={4}>
                    <Card key={campaign.id} variant='outlined' >
                    <CardMedia
                        className={classes.media}
                        
                        image={(campaign.image === null) ? 'https://fakeimg.pl/375x187' : `${campaign.image.url}`}
                        title={(campaign.image === null) ? '' : `${campaign.image.title}`}
                      />
                      <CardContent>
                      
                      <h3>{campaign.title}</h3>
                      <h5>{campaign.goal}</h5>
                      {(campaign.deleted)
                        ? <h5>Deleted</h5>
                        : (campaign.requested) ? <h5>Checked Out</h5> : (campaign.verified
                          ? <h5>Verified</h5>
                          : <h5>Pending</h5>)
                      }
                      </CardContent>
                      <CardContent className={classes.desc}>
                      {/* {(campaign.description.length > 50)
                        ? (
                          <p
                            className="card-text"
                            style={{
                            wordBreak: 'break-word'
                          }}>{campaign
                              .description
                              .split(" ")
                              .slice(0, 20)
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
                            } */}
                            {campaign.description}
                            </CardContent>
                            <br/>
                            <CardContent>
                            {
                        (loggedin && username === this.props.match.params.username) ? ((campaign.requested) ? 
                         '':( <Fragment>
                          <Link to={`/checkout/${campaign.id}`}>Checkout</Link><br/>
                          </Fragment>) 
                          ) : ''
                      }
                      
                      <Link to={`/campaign/${campaign.id}`}>Read More..</Link>
                      </CardContent>
                    </Card>
                    </Grid>
                    </>
                  )
            )}
              
            </Grid>
            </Grid>
          </Grid>
          
            
        </main>

      </Fragment>
    );
    }}
    
    </LoggedInContext.Consumer>
    );
    
  }
}

export default withStyles(useStyles)(Profile);

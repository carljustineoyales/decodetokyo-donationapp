import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {strapi, getRole, getUserName, withToken} from '../components/functions';
import {Link} from 'react-router-dom';
import Navbar from '../components/Home/Navbar';
import { LoggedInContext } from '../contexts/LoggedInContext';
import {Grid,Card,CardHeader,Avatar,CardMedia,CardContent,Typography,Divider,Button,TextField} from '@material-ui/core';

import {withStyles} from '@material-ui/core/styles';
const useStyles = theme => ({
  root:{
    // backgroundColor:'grey',
    width:'auto'
  },
  mainStyle:{
    margin:theme.spacing(14),
    height:'auto',
    [theme.breakpoints.down('md')]:{
      margin:theme.spacing(10,0,0,0),
      // marginTop:theme.spacing(4),
    }
  },
  media: {
    height: 0,
    paddingTop: '50%', 
    [theme.breakpoints.down('md')]:{
      paddingTop: '50%', 
      width:'auto'
      // marginTop:theme.spacing(4),
    }
  },
  avatar: {
    backgroundColor: 'grey',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    
  },
  link:{
    color:'white',
    '&:hover':{
      color:'white'
    }
  },
  gridSpace:{
    padding:theme.spacing(2),
    [theme.breakpoints.down('md')]:{
      padding:theme.spacing(0)
      // marginTop:theme.spacing(4),
    }
  }
})
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
          image:res.data.image.url
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
    console.log(this.props.history)
    const {classes}=this.props
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
        bank_name,
        bank_account,
        account_name
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
          <>

<Navbar/>
<main className={classes.mainStyle}>

  
  <Grid container spacing={4}>
    <Grid container item spacing={2} >
      <Grid item>
      <Button 
      // onClick={this.goBack} 
      className={classes.link}
      href='/feed'
      color='secondary' variant='contained'>Go Back</Button>
      </Grid>
      <Grid item>
      {((context.username === username && loggedin) || role === 'admin')
      ? ((editMode)
        ? (
          <Button color='secondary' variant='contained' onClick={this.refreshPage}>Cancel</Button>
        )
        : ((requested) ? '' : <Button onClick={this.toggleEditMode} color='primary' variant='contained'>Edit</Button>))
      : ''
}
      </Grid>
    
    
    </Grid>
    <Grid item container  xs={12} >
       <Grid item lg={9} xs={12} className={classes.gridSpace}>
        <Card className={classes.root} variant='outlined'>

        <CardMedia
          className={classes.media}
          image={image}
          title={title}
        />
        <CardContent>
          <Typography variant="h3" color="textPrimary" component="p">
          {/* {title}
           */}
           {editMode
              ? (
                <Fragment><TextField
                  type='text'
                  value={title}
                  // className='form-control'

                  onChange={this.handleOnChange('title')}/><br/></Fragment>
              )
              : <h1>{title}</h1>
}
          </Typography>
          <br/>
          <Typography variant="h6" color="textPrimary" component="p">
          {editMode
              ? <input
                  type='number'
                  className='form-control w-25'
                  value={goal}
                  onChange={this.handleOnChange('goal')}/>
              : (<>Fund Goal: {currency} {goal}</>)
}
          </Typography>
          <Typography variant="h6" color="textPrimary" component="p">
          Online Donations: {currency} {raised}
          </Typography>
          <br/><br/>
          <Typography variant="body1" color="textSecondary" component="p" className={classes.desc}>
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
          </Typography>
          {editMode
              ? (
                <Fragment>
                  <button onClick={this.deleteCampaign} className='btn btn-danger'>Delete</button>
                  <button className='btn btn-warning' onClick={this.save}>Save</button>
                </Fragment>
              )
              : ''
}
        </CardContent>


        </Card>
       </Grid>
       <Grid item lg={3} className={classes.gridSpace}>
        <Card className={classes.root}>
        <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={avatar} className={classes.large}/>
          
        }
        
        title={`${first_name} ${last_name}`}
        titleTypographyProps={{variant:'body1' }}
        subheader={`${username}`}
      />
      <Divider/>
      <CardContent>
        <Typography variant='h5'>
          Donate
        </Typography>
        <br/>
        <Typography variant='h5'>
          Offline Donations
        </Typography>
        <Typography variant='body1'>
          Gcash: {gcash_number}
        </Typography>
        <br/>
        <Typography variant='h5'>
          Bank Trasfer
        </Typography>
        <Typography variant='body1'>
          Bank Account: {bank_account}
        </Typography>
        <Typography variant='body1'>
          Bank Name: {bank_name}
        </Typography>
        <Typography variant='body1'>
          Account Name: {account_name}
        </Typography>
        <br/>
        <Typography variant='h5'>
          Online Donations
        </Typography>
        <Typography variant='h5'>
        <Button component={Link} style={{color:'white'}} fullWidth color='primary' variant='contained' to={`/donation/${this.props.match.params.id}`}>Paypal</Button>
        </Typography>
        
      </CardContent>
        </Card>
       </Grid>
    
    </Grid>
  </Grid>
</main>
</>
        )
      }}</LoggedInContext.Consumer>
      
    );
  }
}

export default withStyles(useStyles)(SingleCard);

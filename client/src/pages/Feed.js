import React, {Component} from 'react';
import CardList from '../components/Home/CardList';
import Navbar from '../components/Home/Navbar';
import { LoggedInContext } from '../contexts/LoggedInContext';
import { Link } from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = theme => ({
  mainStyle:{
    margin:theme.spacing(14),
    height:'auto',
  },
  headeing1:{
    fontSize:'32px'
  }
})
export class Feed extends Component {

  render() {
    const {classes} = this.props
    return (
      <LoggedInContext.Consumer>{(context)=>{
        const {done} = context
        console.log(this.props)
        return(
          <div>
              <Navbar/>
              <main className={classes.mainStyle}> 
                
                {/* {(done) ? '' : <h4>Finish Sign up <Link to='/personalinfo'>here</Link> to be able to create campaign</h4>} */}
                  {/* {(this.props.location.pathname === '/feed' || this.props.location.pathname  === '/') ? (
                    <>
                    <Typography variant='h1' className={classes.headeing1}>
                    Explore Campaigns
                  </Typography>
                  <br/>
                  <CardList/>
                  </>
                  ) : ''} */}
                  
                  <Typography variant='h1' className={classes.headeing1}>
                    Explore Campaigns
                  </Typography>
                  <br/>
                  <CardList/>
              </main>
            </div>
        )
      }}</LoggedInContext.Consumer>
            
    );
  }
}

export default withStyles(useStyles)(Feed);

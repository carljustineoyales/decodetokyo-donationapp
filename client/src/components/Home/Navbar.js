import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {CardListContext} from '../../contexts/CardListContext'
import axios from 'axios';
import { LoggedInContext } from '../../contexts/LoggedInContext.js';
import { AppBar, Toolbar, Typography, Button, TextField  } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'
const useStyles = theme => ({
  appBarStyle:{
    background:'#fff',
    position:'fixed',
    padding:'0px 40px',
  },
  appBarStyleTransparent:{
    background:'transparent',
    position:'fixed',
    padding:'0px 40px',
  },
  typographyStyles:{
    flex:1,
  },
  linkStyles:{
    color:'#707070',
    // padding:'16px 40px',
    
  },
  search: {
    display:'inline-block',
    borderRadius: theme.shape.borderRadius,
    
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  navItems:{
    
    display:'inline-block'
  },
  navLinks:{
    marginLeft:'32px',
      color:'#707070',
      '&:hover':{
        textDecoration:'none',
        color:'#707070',
      }
  },
  navLinksLogout:{
    marginLeft:'32px',
      // color:'#707070',
  },

})

export class Navbar extends Component {
  constructor(props)
  {
    super(props);
  }  
  handleLogout = () => {
    
    // window.location.href = '/'
    axios.post('/logout',
    {
      withCredentials: true 
    }
    )
      .then(res=>{
        window.location.href = '/'
        
        console.log(res)
      })
      .catch(err=>{console.log(err)})
  }

  render() {
    const { classes } = this.props;
    return (
      <CardListContext.Consumer>{(CardContext) => {
          return (
            <LoggedInContext.Consumer>{(LoggedInContext)=>{
              const {loggedin,role,id,username,done} = LoggedInContext
          return(
            <header>
              {/* <div className=" container">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <h2 className="navbar-brand">
                  {loggedin ? <Link to="/feed">Logo</Link> : <Link to="/">Logo</Link>}
                    
                  </h2>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarColor01"
                    aria-controls="navbarColor01"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav ml-auto">

                      {(role === 'admin' || window.location.pathname === `/feed`)
                        ? ''
                        : (
                          <li className="nav-item">
                            <Link className="nav-link" to={'/feed'}>Support</Link>
                          </li>
                        )
}
                      {window.location.pathname === `/feed`
                        ? (
                          <Fragment>
                            <form className='form-inline' onSubmit={CardContext.handleOnSearch}>
                              <div className='col-sm-12'>
                                <input
                                  className='form-control form-control-sm w-100'
                                  placeholder='Search by Title'
                                  onChange={CardContext.handleOnChange}
                                  type='text'/>
                              </div>

                            </form>
                          </Fragment>
                        )
                        : ''
}

                      {loggedin
                        ? (
                          <Fragment>
                          {done ? (
                            <li className="nav-item">
                              <Link className="nav-link" to="/create-campaign">Create Campaign</Link>
                            </li>
                          ) : ''}
                            
                            {(role === 'admin')
                              ? (
                                <Fragment>
                                  <li className="nav-item">
                                    <Link className="nav-link" to={`/dashboard/${id}`}>Dashboard</Link>
                                  </li>
                                </Fragment>
                              )
                              : ''
}
                            <li className="nav-item">
                              <Link className="nav-link" to={`/profile/${username}`}>Profile</Link>
                            </li>
                            <li className="nav-item">
                              <button onClick={this.handleLogout} className='btn btn-secondary'>Logout</button>
                            </li>
                          </Fragment>
                        )
                        : (
                          <li className="nav-item">
                              <Link className="nav-link" to={`/login`}>Login</Link>
                            </li>
                        )
}
                    </ul>
                  </div>
                </nav>
              </div> */}
              
              <AppBar 
              className={
                (window.location.pathname === `/login`) ? (`${classes.appBarStyleTransparent}`) : (`${classes.appBarStyle}`)
                }
              >
                <Toolbar>
                  <Typography className={classes.typographyStyles}>
                  {
                    (loggedin) ? <a className={classes.navLinks} href={`/feed`}>Logo</a> : <a className={classes.navLinks} href={`/`}>Logo</a>
                  }
                  
                  </Typography>
                  <div className={classes.navItems}>
                  {window.location.pathname === `/feed`
                        ? (
                          <Fragment>
                            <form onSubmit={CardContext.handleOnSearch} className={classes.search}>
                            <TextField id="filled-search" size='small' placeholder='Search Campaign' type="search" variant="outlined" onChange={CardContext.handleOnChange}/>

                            </form>
                          </Fragment>
                        )
                        : <Button className={classes.navLinks}  href={`/feed`}>Explore</Button>
}
                  
                  
                  {loggedin
                        ? (
                          <Fragment>
                          {done ? (
                            
                              <Button className={classes.navLinks} href="/create-campaign">Create Campaign</Button>
                            
                          ) : ''}
                            
                            {(role === 'admin')
                              ? (
                                <Fragment>
                                  
                                  
                                  <Button className={classes.navLinks} href={`/dashboard/${id}`}>Dashboard</Button>
                                  
                                </Fragment>
                              )
                              : ''
}
                            
                            <Button className={classes.navLinks} href={`/profile/${username}`}>Profile</Button>
                            <Button  className={classes.navLinksLogout} onClick={this.handleLogout} color="secondary" variant="contained">
                              Logout
                            </Button>
                          </Fragment>
                        )
                        : (
                          <Button className={classes.navLinks} href={`/login`}>Login</Button>
                        )
}
</div>
                </Toolbar>
              </AppBar>
            </header>
            
          )
        }}

        </LoggedInContext.Consumer>
          )
        }}

      </CardListContext.Consumer>

    );
  }
}

export default withStyles(useStyles)(Navbar);

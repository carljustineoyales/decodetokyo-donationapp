import React, {Component, Fragment} from 'react';
// import {Link} from 'react-router-dom';
import {CardListContext} from '../../contexts/CardListContext'
import axios from 'axios';
import { LoggedInContext } from '../../contexts/LoggedInContext.js';
import { AppBar, Toolbar, Typography, Button, TextField,IconButton, Box, Hidden,fade,InputBase,Link,Menu,MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {withStyles} from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
const useStyles = theme => ({
  root: {
    flexGrow: 1,
    background:'white'
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
    color:theme.palette.primary.contrastText,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(0),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  navLink:{
    marginRight:theme.spacing(2),
    color:theme.palette.primary.contrastText,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
    search:{
      display: 'block',
     
    }
  },
  
});

export class Navbar extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      anchorEl:null
    }
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

  handleClick = (event) => {
    this.setState({anchorEl:event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl:null});
  };

  render() {
    const { classes } = this.props;
    return (
      <CardListContext.Consumer>{(CardContext) => {
          return (
            <LoggedInContext.Consumer>{(LoggedInContext)=>{
              const {loggedin,role,id,username,done} = LoggedInContext
          return(
            <header className={classes.root}>
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
              
              {/* <AppBar 
                  className={
                    classes.appBarStyleTransparent
                    }
                  >
              
                <Toolbar>
                  <Typography className={classes.typographyStyles}>
                  {
                    (loggedin) ? <a className={classes.navLinks} href={`/feed`}>Logo</a> : <a className={classes.navLinks} href={`/`}>Logo</a>
                  }
                  
                  </Typography>
                  <Hidden mdDown>
                  <Box className={classes.navItems}>
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
                </Box>
                  </Hidden>
                  <Hidden lgUp>
                  <Box className={classes.navItems}>
                  <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
                  </Box>
                  </Hidden>
                </Toolbar>
               
              </AppBar> */}
              <AppBar position="fixed">
        <Toolbar>
          
          <Typography className={classes.title} variant="h6" noWrap>
          {loggedin ? (
            <Link className={classes.title} href='/feed'>
              Logo
              </Link>) : (
                <Link className={classes.title} href='/'>
              Logo
              </Link>
              ) }
              
            
          </Typography>
          
          {window.location.pathname === `/feed` ? 
          (
            <div className={classes.navLink.search}>
          <div className={classes.search }>
            
            <form onSubmit={CardContext.handleOnSearch}>
            
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
                
              }}
              
              type='search'
              inputProps={{ 'aria-label': 'search' }}
              onChange={CardContext.handleOnChange}
            />
            </form>
          </div>
          </div>
          ):(
            <Typography variant="p" noWrap >
            <Link className={classes.navLink} href='/feed'>Explore</Link>
          </Typography>
          )}
          {loggedin
            ? (
              <Fragment>
              {done ? (
                <Typography variant="p"  noWrap >
                  <Link className={classes.navLink} href="/create-campaign">Create Campaign</Link>
                </Typography>
                  
                
              ) : ''}
                
                {(role === 'admin')
                  ? (
                    <Typography variant="p"  noWrap >
                        <Link className={classes.navLink} href={`/dashboard/${id}`}>Dashboard</Link>
                      </Typography>
                    
                  )
                  : ''
                }
                <Typography variant="p"  noWrap >
                  <Link className={classes.navLink} href={`/profile/${username}`}>Profile</Link>
                </Typography>
                <Typography variant="p"  noWrap >
                  <Link className={classes.navLink} component='button' onClick={this.handleLogout}>Sign Out</Link>
                </Typography>
                
               
              </Fragment>
            )
            : (
              <>
              
              <Typography variant="p"  noWrap >
                <Link className={classes.navLink} href='/login'>Sign In</Link>
              </Typography>
              </>
            )
          }
         
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleClick}
          >
            <MenuIcon />

          </IconButton>
          <Menu
        id="simple-menu"
        anchorEl={this.state.anchorEl}
        keepMounted
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleClose}
      >
        {loggedin
            ? (
              <Fragment>
              {done ? (
                
                <MenuItem onClick={this.handleClose}>
                  <Link  href="/create-campaign">Create Campaign</Link>
                </MenuItem>
                
              ) : ''}
                
                {(role === 'admin')
                  ? (
                    <MenuItem onClick={this.handleClose}>
                      <Link  href={`/dashboard/${id}`}>Dashboard</Link>
                    </MenuItem>
                    
                  )
                  : ''
                }
                 
                <MenuItem onClick={this.handleClose}>
                <Link  href={`/profile/${username}`}>Profile</Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                <Link component='button' onClick={this.handleLogout}>Sign Out</Link>
                </MenuItem>
                
                
               
              </Fragment>
            )
            : (
              <>
              <MenuItem onClick={this.handleClose}>
              <Link  href='/feed'>Explore</Link>
                </MenuItem>
              <MenuItem onClick={this.handleClose}>
              <Link  href='/login'>Sign In</Link>
                </MenuItem>
              </>
            )
          }
        
      </Menu>
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

import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Feed from './pages/Feed';
import CreateCampaign from './pages/CreateCampaign';
import SingleCard from './pages/SingleCard';
import Profile from './pages/Profile';
import Donation from './pages/Donation';
import EditProfile from './pages/EditProfile';
import CheckOut from './pages/CheckOut';
import NotFound from './pages/NotFound';
import {CardListContextProvider} from './contexts/CardListContext'
import Verification from './pages/Verification';
import RegistrationContext from './contexts/RegistrationContext';
import NeedHelp from './pages/NeedHelp';
import ChangePassword from './pages/ChangePassword';
import ResetPassword from './pages/ResetPassword';
import PersonalInfo from './components/forms/PersonalInfo';
import LoginPage from './pages/LoginPage';
import ResendEmailVerification from './pages/ResendEmailVerification'
import axios from 'axios';
import gcashToolTip from './components/Tooltip/gcashToolTip';
import PaypalToolTip from './components/Tooltip/PaypalToolTip';
import { MuiThemeProvider } from '@material-ui/core';


class App extends Component {

  showRoutes = () => {
    console.log(this.props.done)
    switch (this.props.loggedin) {
      case true:
        return(
          <>
          {(this.props.done) ? (
            <Switch>
            
            <Route path="/dashboard/:id" component={Dashboard}/>
          <Route path="/edit/:username" component={EditProfile}/>
          <Route path="/profile/:username" component={Profile}/>
          <Route path="/campaign/:id" component={SingleCard}/>
          <Route path="/help" component={NeedHelp}/>
          <Route path="/donation/:id" component={Donation}/>
          <Route path="/checkout/:id" component={CheckOut}/>
          <Route path="/create-campaign" component={CreateCampaign}/>
          {/* <Route path='/' component={Home}/> */}
          <Route path="/login" component={LoginPage}/>
          {/* <Route path="/" component={Feed}/> */}
          <Redirect from='/login' to='/' />
          <Route path='/'>
            <Feed />
          </Route>
          {/* <Redirect exact from='/login' to='/'/> */}
          {/* <Redirect exact from='/' to='/feed'/> */}
          
          
          </Switch>
          ):
          (
            <>
            {/* <Route path="/feed" component={Feed}/> */}
            <Route path="/personalinfo" component={PersonalInfo}/> 
            {/* <Route path="/feed" component={Feed}/> */}
            <Redirect to='/personalinfo'/>
            </>
            )}
          
          </>
        )
        
        case false:
          return(
            <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/feed" component={Feed}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/campaign/:id" component={SingleCard}/>
            <Route path="/?confirmation=:code" component={Verification}/>
            <Route path="/help" component={NeedHelp}/>
            <Route path="/donation/:id" component={Donation}/>
            <Route path="/forgot-password" component={ChangePassword}/>
            <Route path="/reset-password" component={ResetPassword}/>
            <Route path="/resendemailverification" component={ResendEmailVerification}/>
            <Route path="/profile/:username" component={Profile}/>
            {/* <Route path="/gcashtooltip" component={gcashToolTip}/>
            <Route path="/paypaltooltip" component={PaypalToolTip}/> */}

            </Switch>
          )
      default:
        break;
    }
  }

  componentDidMount(){
    
    if(!this.props.loggedin){
      axios({
        url:'/',
        method:'post',
        headers:{
          'Cookie':'access_token'
        },
        withCredentials:true
      })
      .then(res=>{
        console.log(res)
        this.props.handleOnSuccess(res.data.id)
      })
      .catch(err=>{console.log(err.response.status)})
    }
    
  }
  render() {
    return (
      <MuiThemeProvider>
      <Fragment>
      
      <RegistrationContext>
      <CardListContextProvider>
        <Router>
         
            {this.showRoutes()}
          
        </Router>
      </CardListContextProvider>
      </RegistrationContext>
      
      </Fragment>
      </MuiThemeProvider>
      // <this.Button name='title'/>
    );
  }

}

export default App;

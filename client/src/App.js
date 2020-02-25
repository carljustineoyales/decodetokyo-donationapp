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
import {withToken} from './components/functions';
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
import axios from 'axios';
class App extends Component {

  showRoutes = () => {
    switch (this.props.loggedin) {
      case true:
        return(
          <Switch>
          
          <Route path="/dashboard/:id" component={Dashboard}/>
          <Route path="/edit/:username" component={EditProfile}/>
          <Route path="/profile/:username" component={Profile}/>
          <Route path="/campaign/:id" component={SingleCard}/>
          <Route path="/help" component={NeedHelp}/>
          <Route path="/donation/:id" component={Donation}/>
          <Route path="/checkout/:id" component={CheckOut}/>
          <Route path="/create-campaign" component={CreateCampaign}/>
          <Redirect from='/login' to='/feed'/>
          <Route path="/feed" component={Feed}/>
          
          </Switch>
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
            <Route path="/personalinfo" component={PersonalInfo}/> 
            <Route path="/profile/:username" component={Profile}/>
            
            </Switch>
          )
      default:
        break;
    }
  }

  componentDidMount(){
    // axios.post('/',{
    //   headers:{
    //     'Cookie':'access_token'
    //   }
    // })
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
      <Fragment>
      <RegistrationContext>
      <CardListContextProvider>
        <Router>
         
            {this.showRoutes()}
          
        </Router>
      </CardListContextProvider>
      </RegistrationContext>
      </Fragment>
    );
  }

}

export default App;

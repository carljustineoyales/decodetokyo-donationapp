import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Feed from './pages/Feed';
import CreateCampaign from './pages/CreateCampaign';
import SingleCard from './pages/SingleCard';
import Profile from './pages/Profile';
import Donation from './pages/Donation';
import EditProfile from './pages/EditProfile';
import {getRole, withToken} from './components/functions';
import CheckOut from './pages/CheckOut';
import NotFound from './pages/NotFound';
import {CardListContextProvider} from './contexts/CardListContext'
import Verification from './pages/Verification';
import RegistrationContext from './contexts/RegistrationContext';
import NeedHelp from './pages/NeedHelp';
import ChangePassword from './pages/ChangePassword';
import ResetPassword from './pages/ResetPassword';
class App extends Component {

  render() {
    return (
      <Fragment>
      <RegistrationContext>
      <CardListContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/feed" component={Feed}/>
            <Route path="/campaign/:id" component={SingleCard}/>
            <Route path="/donation/:id" component={Donation}/>
            <Route path="/profile/:username" component={Profile}/>
            <Route path="/?confirmation=:code" component={Verification}/>
            <Route path="/help" component={NeedHelp}/>
            <Route path="/forgot-password" component={ChangePassword}/>
            <Route path="/reset-password" component={ResetPassword}/>
            
            <Route
              path="/dashboard/:username"
              render={() => getRole() === 'admin'
              ? <Dashboard/>
              : <Route component={NotFound}/>}/>
            <Route
              path="/edit/:id"
              render={() => !withToken()
              ? <Route component={NotFound}/>
              : <EditProfile/>}/>
            <Route
              path="/create-campaign"
              render={() => !withToken()
              ? <Route component={NotFound}/>
              : <CreateCampaign/>}/>
            <Route path="/checkout/:id" component={CheckOut}/>
            <Route component={NotFound}/>
            {/* {withToken() ? <Route path="/create-campaign" component={CreateCampaign}/> : <Route component={NotFound}/>} */}
          </Switch>
        </Router>
      </CardListContextProvider>
      </RegistrationContext>
      </Fragment>
    );
  }

}

export default App;

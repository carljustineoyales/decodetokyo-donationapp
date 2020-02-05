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
import Success from './pages/Success';
import CheckOut from './pages/CheckOut';
import NotFound from './pages/NotFound';

class App extends Component {

  render() {
    return (
      <Fragment>

        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/feed" component={Feed}/>
            <Route path="/create-campaign" component={CreateCampaign}/>
            <Route path="/campaign/:id" component={SingleCard}/>
            <Route path="/donation/:id" component={Donation}/>
            <Route path="/profile/:username" component={Profile}/>
            <Route path="/success" component={Success}/>
            
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
            <Route path="/checkout/:id" component={CheckOut}/>
            <Route component={NotFound}/>
          </Switch>

        </Router>

      </Fragment>
    );
  }

}

export default App;

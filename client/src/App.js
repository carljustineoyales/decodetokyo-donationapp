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
class App extends Component {

  render() {
    return (
      <Fragment>
      <CardListContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/feed" component={Feed}/>
            <Route path="/campaign/:id" component={SingleCard}/>
            <Route path="/donation/:id" component={Donation}/>
            <Route path="/profile/:username" component={Profile}/>
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
          </Switch>
        </Router>
      </CardListContextProvider>
      </Fragment>
    );
  }

}

export default App;

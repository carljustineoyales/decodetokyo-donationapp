import React from 'react';
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

function App() {

  return (
<div>
    <Router >
      <Switch>
        <Route exact path="/"                    component={Home          }/>
        <Route       path="/dashboard/:username" component={Dashboard     }/>
        <Route       path="/feed"                component={Feed          }/>
        <Route       path="/create-campaign"     component={CreateCampaign}/>
        <Route       path="/campaign/:id"        component={SingleCard    }/>
        <Route       path="/review/campaign/:id" component={SingleCard    }/>
        <Route       path="/profile/:id"         component={Profile       }/>
        <Route       path="/profile-edit/:id"    component={EditProfile   }/>
        <Route       path="/donation/:id"        component={Donation      }/>
      </Switch>
      </Router>
      
</div>
  );
}

export default App;

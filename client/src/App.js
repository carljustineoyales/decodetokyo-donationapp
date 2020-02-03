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
import {getRole,withToken} from './components/functions';

const NoMatchPage = () => {
  return (
    <h3>404 - Not found</h3>
  );
};

function App() {

  return (
<div>
    <Router >
      <Switch>
      {/* PUBLIC ROUTES */}
        <Route exact path="/"                    component={Home          }/>      
        <Route       path="/feed"                component={Feed          }/>
        <Route       path="/create-campaign"     component={CreateCampaign}/>
        <Route       path="/campaign/:id"        component={SingleCard    }/>      
        <Route       path="/donation/:id"        component={Donation      }/>
        <Route       path="/profile/:id"         component={Profile       }/>

        {/* PROTECTED ROUTES */}
        {/* ADMIN ROUTES */}
        <Route       path="/dashboard/:username"  render={()=>
          getRole() === 'admin' ? <Dashboard/> : <Route component={NoMatchPage} />
        }/>
        {/* USER ROUTES */}
        
        {/* <Route       path="/edit/:id"    component={EditProfile   }/> */}
        <Route       path="/edit/:id"   render={()=>
        !withToken() ? <Route component={NoMatchPage}/> : <EditProfile/>}

        />

      </Switch>
    </Router>
</div>
  );
}

export default App;

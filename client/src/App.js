import React,{Component} from 'react';
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
import {getRole,withToken,strapi,getId} from './components/functions';
import Success from './pages/Success';
import CheckOut from './pages/CheckOut';
import axios from 'axios';

const NoMatchPage = () => {
  return (
    <h3>404 - Not found</h3>
  );
};




class App extends Component {

  constructor(props) {
    
    super(props);
    this.state={
      id:''
    }
  }
  

  componentDidMount(){
    axios.get(`${strapi}/users/${getId()}`)
    .then(res=>{
      this.setState({
        id:res.data.id
      })
    })
    .catch(err=>{console.log(err.response.data.message)})
  }
  
  render() {
    return (
      <div>
          <Router>
            <Switch>
            {/* PUBLIC ROUTES */}
              <Route exact path="/"                    component={Home          }/>      
              <Route       path="/feed"                component={Feed          }/>
              <Route       path="/create-campaign"     component={CreateCampaign}/>
              <Route       path="/campaign/:id"        component={SingleCard    }/>      
              <Route       path="/donation/:id"        component={Donation      }/>
              <Route       path="/profile/:id"         component={Profile       }/>
              <Route       path="/success"             component={Success       }/>
              
              {/* PROTECTED ROUTES */}
              {/* ADMIN ROUTES */}
              <Route       path="/dashboard/:username"  render={()=>getRole() === 'admin' ? <Dashboard/> : <Route component={NoMatchPage} />
              }/>
              {/* USER ROUTES */}
              
              <Route       path="/edit/:id"   render={()=>!withToken() ? <Route component={NoMatchPage}/> : <EditProfile/>}/>
              
              <Route path="/checkout/:id"             component={CheckOut       }/>
            </Switch>
          </Router>
      </div>
        );
  }
  
}

export default App;

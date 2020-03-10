import React, { Component } from 'react';
import Navbar from '../components/Home/Navbar'



import CampaignTable from '../components/dashboard/CampaignTable'
import { LoggedInContext } from '../contexts/LoggedInContext';
export class Dashboard extends Component {
  render() {
    
    
      return (
        <LoggedInContext.Consumer>{(context)=>{
          const {username} = context
          return(
            <div>
        <Navbar />
          <main>
            <div className='container'>
            <h2>{username}</h2>
          <CampaignTable />
            </div>
          </main>          
        </div>
          )
        }}</LoggedInContext.Consumer>
        
      );
   
    
  }
}

export default Dashboard;

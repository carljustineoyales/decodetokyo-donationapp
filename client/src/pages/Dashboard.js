import React, { Component } from 'react';
import Navbar from '../components/Home/Navbar'
import {getUserName} from '../components/functions'


import CampaignTable from '../components/dashboard/CampaignTable'
export class Dashboard extends Component {
  render() {
    const username = getUserName();
    
      return (
        <div>
        <Navbar />
          <main>
            <div className='container'>
            <h2>{username}</h2>
          <CampaignTable />
            </div>
          </main>          
        </div>
      );
   
    
  }
}

export default Dashboard;

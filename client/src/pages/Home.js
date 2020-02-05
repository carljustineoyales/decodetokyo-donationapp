import React, {Component, Fragment} from 'react';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';
import UserForm from './UserForm';
import Feed from './Feed';
import {withToken} from '../components/functions'
import About from '../components/Home/About';
import CardListContextProvider from '../contexts/CardListContext';
import { Redirect } from 'react-router-dom';


export class Home extends Component {

  render() {
    
  if(withToken()){
    return (
      <CardListContextProvider>
        
        <Redirect to={`/feed`}>
        <Feed/>
        </Redirect>
        </CardListContextProvider>
    )
  }else{
    return (
      <CardListContextProvider>
        <Navbar/>
        <main>
          <div className='container'>
            <div className="row">
              <div className='col-sm'><About/></div>
              <div className='col-sm'><UserForm/></div>
            </div>
          </div>
        </main>
        <Footer/>
      </CardListContextProvider>
      );
     
  }
      
      
    
  }
}

export default Home;

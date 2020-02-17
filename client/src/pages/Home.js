import React, {Component, Fragment} from 'react';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';
import UserForm from './UserForm';
import Feed from './Feed';
import {withToken} from '../components/functions'
import About from '../components/Home/About';
import { Redirect } from 'react-router-dom';
import { RegistrationContext } from '../contexts/RegistrationContext';


export class Home extends Component {

  render() {
    
  if(withToken()){
    return (
        <Redirect to={`/feed`}/>
    )
  }else{
    return (
      <RegistrationContext.Consumer>{(context) => {
        
        return(
          <>
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
        </>
        )
      }
      }
        
        </RegistrationContext.Consumer>
      );
     
  }
      
      
    
  }
}

export default Home;

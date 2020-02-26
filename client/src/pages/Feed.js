import React, {Component} from 'react';
import CardList from '../components/Home/CardList';
import Navbar from '../components/Home/Navbar';
import { LoggedInContext } from '../contexts/LoggedInContext';
import { Link } from 'react-router-dom';

export class Feed extends Component {

  render() {
    return (
      <LoggedInContext.Consumer>{(context)=>{
        const {done} = context
        return(
          <div>
              <Navbar/>
              <main>
                <div className='container'>
                {(done)? '' : <h4>Finish Sign up <Link to='/personalinfo'>here</Link> to be able to create campaign</h4>}
                  <CardList/>
                </div>
              </main>
            </div>
        )
      }}</LoggedInContext.Consumer>
            
    );
  }
}

export default Feed;

import React, {Component} from 'react';
import CardList from '../components/Home/CardList';
import {CardListContextProvider} from '../contexts/CardListContext'
import Navbar from '../components/Home/Navbar';

export class Feed extends Component {

  render() {
    return (
      <CardListContextProvider>
          
            <div>
              <Navbar/>
              <main>
                <div className='container'>
                  <CardList/>
                </div>
              </main>
            </div>
          
        </CardListContextProvider>
    );
  }
}

export default Feed;

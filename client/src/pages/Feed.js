import React, {Component} from 'react';
import CardList from '../components/Home/CardList';

import Navbar from '../components/Home/Navbar';

export class Feed extends Component {
  componentDidMount(){
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <div>
      <Navbar/>
      <main>
        <div className='container'>
            <CardList/>
        </div>
        </main>
      </div>

    );
  }
}

export default Feed;

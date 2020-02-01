import React, {Component, Fragment} from 'react';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';

import UserForm from './UserForm';
import Feed from './Feed';
import {withToken} from '../components/functions'
import About from '../components/Home/About';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  render() {
    if (withToken()) {
      return (
        <Fragment>
          <Feed/>
        </Fragment>
      );

    } else {
      return (
        <Fragment>
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

        </Fragment>
      );
    }
  }
}

export default Home;

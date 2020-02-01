import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Home/Navbar';
import {URL} from '../functions'

export class BookPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {},
      isLoaded: false
    }
  }

  componentDidMount() {
    // const wordPressURL = "http://localhost:80/";
    axios
      .get(`${URL}/wp-json/wp/v2/books/${this.props.match.params.id}`)
      .then(res => this.setState({book: res.data, isLoaded: true}))
      .catch()
  }

  render() {
    const {book, isLoaded} = this.state;
    if (isLoaded) {
      return (
        <div>
          <Navbar/>
          <Fragment>
            <Link to='/'>Go Back</Link>
            <hr/>
            <h1>{book.title.rendered}</h1>
            <div
              dangerouslySetInnerHTML={{
              __html: book.content.rendered
            }}></div>
            <h4>Publisher: {book.acf.publisher}</h4>
          </Fragment>
        </div>

      );
    }
    return <h3>Loading..</h3>
  }
}

export default BookPage;

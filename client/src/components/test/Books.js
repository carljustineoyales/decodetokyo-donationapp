import React, {Component} from 'react';
import BookItem from './BookItem';
import axios from 'axios';
import Navbar from '../Home/Navbar'
import {URL} from '../functions'
export class Books extends Component {
  constructor(props){
    super(props);
    this.state = {
      books: [],
      isLoaded: false
    }
  }
  

  componentDidMount() {
    // fetch('/si') .then(response => {   console.log(response);   return
    // response.json(); });
    // const wordPressURL = "http://localhost:80/"
    axios
      .get(`${URL}/wp-json/wp/v2/books`)
      .then(res => this.setState({books: res.data, isLoaded: true}))
      .catch(err => console.log(err));
  }
  render() {
    console.log(this.state)
    const {books, isLoaded} = this.state;
    if (isLoaded) {
      return (
        <div>
        <Navbar />
          {books.map(book => (<BookItem key={book.id} book={book}/>))}
        </div>
      );
    }
    return (
      <div>
      <Navbar />
        <h3>
          loading...
        </h3>
      </div>
    )
  }
}

export default Books;
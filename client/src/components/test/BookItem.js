import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import axios from 'axios'
import {URL} from '../functions'

export class BookItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      author: '',
      isLoaded: false
    }
  }

  static propTypes = {
    book: PropTypes.object.isRequired
  }

  componentDidMount() {
    // const wordPressURL = "http://localhost:80/";
    const {featured_media, author} = this.props.book;
    const getImageUrl = axios.get(`${URL}/wp-json/wp/v2/media/${featured_media}`);
    const getAuthor = axios.get(`${URL}/wp-json/wp/v2/users/${author}`);

    Promise
      .all([getImageUrl, getAuthor])
      .then(res => this.setState({imageUrl: res[0].data.media_details.sizes.full.source_url, author: res[1].data.name, isLoaded: true}));
  }

  render() {
    const {title, excerpt, id} = this.props.book;
    const {author, imageUrl, isLoaded} = this.state

    if (isLoaded) {
      return (
        <div>
          <h2>{title.rendered}</h2>
          <small>Review By
            <strong>{author}</strong>
          </small><br/>
          <img
            src={imageUrl}
            style={{
            width: "50%"
          }}
            alt={title.rendered}/>
          <div
            dangerouslySetInnerHTML={{
            __html: excerpt.rendered
          }}></div>
          <Link to={`/book/${id}`}>Read Review</Link>
          <hr/>
        </div>
      );
    }
    return null
  }
}

export default BookItem;

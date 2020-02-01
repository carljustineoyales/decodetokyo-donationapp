import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createPosts} from '../../actions/postActions';
export class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
    this.hanldeOnChange = this
      .hanldeOnChange
      .bind(this)
    this.handleOnSubmit = this
      .handleOnSubmit
      .bind(this)
  }

  hanldeOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnSubmit = e => {
    e.preventDefault();

    const post = {
      title: this.state.title,
      body: this.state.body
    };

   this.props.createPosts(post);

  }

  render() {
    return (
      <div>
        <h1>Add Post</h1>
        <form onSubmit={this.handleOnSubmit}>
          <input
            type='text'
            name='title'
            value={this.state.title}
            onChange={this.hanldeOnChange}/>
          <textarea name='body' value={this.state.body} onChange={this.hanldeOnChange}></textarea>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  createPosts: PropTypes.func.isRequired,
}


export default connect(null, {createPosts})(PostForm);

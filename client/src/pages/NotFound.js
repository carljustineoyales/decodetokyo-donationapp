import React, { Component } from 'react';
import {Link} from 'react-router-dom'
export class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>Oppss.. Page Not Found</h1>
        <h5>Click <Link to={`/feed`}>here</Link> to return to home</h5>
      </div>

    );
  }
}

export default NotFound;

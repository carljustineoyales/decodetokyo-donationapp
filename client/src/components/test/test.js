import React, { Component } from 'react';
import axios from 'axios'
export class test extends Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }

  }
  handleOnChange = (e) => {
    let file = e.target.files[0]
    // console.log(e.target.files[0],'$$$$')
    this.setState = {
      file: file
    }
  }

  handleUpload = () => {
    console.log(this.state)

    let file = this.state.file;
    let formData = new FormData();
    formData.append('image',file);
    formData.append('name','image');

    axios({
      url:`/some/api`,
      method:'GET',
      headers:{
        authorization: 'token here'
      },
      data:formData
    }).then(res=>{console.log(res.data)}).catch(err=>{console.log(err.response.data.message)})
  }

  render() {
    return (
      <div>
        <h1>hello</h1>
        <form>
          <input type='file' name='file' onChange={(e) => this.handleOnChange(e)}/>
          <button>Upload</button>
        </form>
      </div>
    );
  }
}

export default test;

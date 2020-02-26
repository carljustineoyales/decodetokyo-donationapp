import React, {createContext, Component} from 'react';
import {strapi} from '../components/functions'
import axios from 'axios';
export const LoggedInContext = createContext();

export class LoggedInContextProvider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedin:false,
      username: '',
      id: '',
      role: '',
      done: false
    }
  }

  handleOnSuccess = (data) => { 
   
    axios({
      url:`/getlogin`,
      method:'post',
      data:{
        id:data
      }
    })
      .then(res=>{
        console.log(res.data)
        this.setState({
          loggedin:true,
          id:res.data.id,
          username:res.data.username,
          role:res.data.role.type,
          done:res.data.done
      })
      })
      .catch(err=>{console.log(err.response)})
  
  }


  render() {
    return (
      <LoggedInContext.Provider
        value={{
        ...this.state,
        handleOnSuccess: this.handleOnSuccess,
        
      }}>
        {this.props.children}
      </LoggedInContext.Provider>
    );
  }
}

export default LoggedInContextProvider;

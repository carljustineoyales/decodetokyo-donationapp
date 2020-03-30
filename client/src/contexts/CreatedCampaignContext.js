import React, { createContext, Component } from 'react';
import axios from 'axios';
import {strapi} from '../components/functions'
export const CreatedCampaignContext = createContext();

export class CreatedCampaignContextProvider extends Component {
  _isMounted=false
  
  constructor(props) {
    super(props);
    this.state={
      cards:[],
      isLoaded:false,
      query:''
    }
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange = (event) => {
    
  }
  

  
  componentDidMount(){
    this._isMounted=true
    
      axios({
      url:'/getuserprofile',
      method:'post',
      withCredentials:true,
      data:{
        username:this.props.match.params.username
      }
    })
      .then(res => {
        console.log(res.data)
        this.setState({profile_data: res.data})

      })
      .catch(err => {
        console.log(err)
      })

  }

  componentWillUnmount(){
    this._isMounted=false
  }
  
  render() {
    return (
      <CreatedCampaignContext.Provider value={{...this.state, handleOnSearch:this.handleOnSearch, handleOnChange:this.handleOnChange}}>
        {this.props.children}
      </CreatedCampaignContext.Provider>
    );
  }
}

export default CreatedCampaignContextProvider;

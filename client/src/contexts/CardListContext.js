import React, { createContext, Component } from 'react';
import axios from 'axios';
import {strapi} from '../components/functions'
export const CardListContext = createContext();

export class CardListContextProvider extends Component {
  _isMounted=false
  query = ''
  constructor(props) {
    super(props);
    this.state={
      cards:[],
      isLoaded:false,
    }
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange = (event) => {
      this.query = event.target.value
    }
  

  handleOnSearch = (event) => {
  
    event.preventDefault();
      if(this.query.length > 0){
        //move to backend
        axios.get(`${strapi}/campaigns?verified=true&title=${this.query}`)
        .then(res=>{
            // this.query=''
            this.setState({
              cards:res.data,
              isLoaded: true,
            })
        })
        .catch(err=>{
          console.log(err)
        })
      }else{
        this.componentDidMount();
      }
  }

  componentDidMount(){
    this._isMounted=true
    
      axios({
        url:'/getcards/campaigns?verified=true&requested=false',
        method:'post'
      })
      .then(res=>{
        console.log(res.data)
        if(this._isMounted){
          this.setState({
            cards:res.data,
            isLoaded: true,
          })
        }
        
      })
      .catch(err=>{
        console.log(err)
      })
  }

  componentWillUnmount(){
    this._isMounted=false
  }
  
  render() {
    return (
      <CardListContext.Provider value={{...this.state, handleOnSearch:this.handleOnSearch, handleOnChange:this.handleOnChange}}>
        {this.props.children}
      </CardListContext.Provider>
    );
  }
}

export default CardListContextProvider;

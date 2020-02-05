import React, { createContext, Component } from 'react';
import axios from 'axios';
import {strapi} from '../components/functions'
export const CardListContext = createContext();

export class CardListContextProvider extends Component {
  _isMounted=false
  constructor(props) {
    super(props);
    this.state={
      cards:[],
      isLoaded:false,
      query:'',
      
    }
    
  }
  

  handleOnSearch = (event) => {
    this.setState({
      query:event.target.value
    })
    // const card = this.state.cards.map(card=>(card.title))
    
  }

  componentDidMount(){
    this._isMounted=true
    
      axios.get(`${strapi}/campaigns?verified=true`)
      .then(res=>{
        // console.log(res.data)
        if(this._isMounted){
          this.setState({
            cards:res.data,
            isLoaded: true,
          })
        }
        
      })
      .catch(err=>{
        console.log(err.response.data.message)
      })
  }

  componentWillUnmount(){
    this._isMounted=false
  }
  
  render() {
    console.log(this.state.cards)
    const filteredCard = this.state.cards.filter(card=>{
      return card.title.toLowerCase().includes(this.state.query.toLocaleLowerCase())       
    })
    return (
      <CardListContext.Provider value={{...this.state, handleOnSearch:this.handleOnSearch,filteredCard}}>
        {this.props.children}
      </CardListContext.Provider>
    );
  }
}

export default CardListContextProvider;

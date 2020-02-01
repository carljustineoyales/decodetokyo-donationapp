import React, {Component} from 'react';
import Card from './Card';

import {strapi} from '../functions';
import axios from 'axios';

export class CardList extends Component {
  constructor(props) {
    super(props);
    this.state={
      cards:[],
      isLoaded:false,
      error: ''
    }
  }

  componentDidMount() {
    axios.get(`${strapi}/campaigns?verified=true`)
    .then(res=>{
      console.log(res.data)
      this.setState({
        cards:res.data,
        isLoaded:true
      })
    })
    .catch(err=>console.log(err.response.data.message))
  }

  
  render() {
    const {cards, isLoaded} = this.state;
    console.log(cards)
    if (isLoaded) {
      return (
        <div>
        {cards.reverse().map(card => (<Card key={card.id} card={card}/>))}
        </div>
      );
    } else {
      return (<div>Loading ...</div>)
    }
    
  }
}

export default CardList;

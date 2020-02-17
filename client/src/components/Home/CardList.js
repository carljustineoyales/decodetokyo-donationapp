import React, {Component} from 'react';
import Card from './Card';
import {CardListContext} from '../../contexts/CardListContext'

export class CardList extends Component {

  render() {
    
    return (
      <CardListContext.Consumer>{(context) => {
        const {isLoaded,cards} = context
          if (isLoaded) {
            if(cards.length > 0){
              return (
              <div>
                {cards
                  .reverse()
                  .map(card => (<Card key={card.id} card={card}/>))}
              </div>
            );
            }else{
              return(<h1>No Result Found</h1>)
            }
            
          } else {
            return (
              <div>Loading ...</div>
            )
          }
        }}</CardListContext.Consumer>
    )

  }
}

export default CardList;
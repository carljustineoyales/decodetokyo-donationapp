import React, {Component, useState} from 'react';
import Card from './Card';
import {CardListContext} from '../../contexts/CardListContext'
export class CardList extends Component {

  render() {
    
    return (
      <CardListContext.Consumer>{(context) => {
        const {isLoaded, filteredCard} = context
          if (isLoaded) {
            if(filteredCard.length > 0){
              return (
              <div>
                {context
                  .filteredCard
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
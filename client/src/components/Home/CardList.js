import React, {Component} from 'react';
import CardItem from './CardItem';
import {CardListContext} from '../../contexts/CardListContext'
import { Grid,Paper } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'
const useStyles = theme => ({
  root: {
    maxWidth: '100%',
    minHeight:'100%'
  },
  
})
export class CardList extends Component {

  render() {
    const {classes} = this.props
    return (
      <CardListContext.Consumer>{(context) => {
        const {isLoaded,cards} = context
          if (isLoaded) {
            if(cards.length > 0){
              return (
                <Grid container spacing={4} direction="row"
  justify="flex-start"
  alignItems="stretch">
                {cards
                  
                  .map(card => (<Grid item md={4} xs={12}><Paper variant='outlined'><CardItem key={card.id} card={card} /></Paper></Grid>))}
              </Grid>
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

export default withStyles(useStyles)(CardList);
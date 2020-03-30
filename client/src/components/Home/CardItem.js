import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import {strapi} from '../functions';
import Moment from 'react-moment';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {withStyles} from '@material-ui/core/styles'
import { Paper } from '@material-ui/core';

const useStyles = theme => ({
  root: {
    maxWidth: '100%',
    
  },
  desc:{
    height:'160px',
    overflow:'hidden'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: 'grey',
  },
  card:{
    '&:hover':{
      textDecoration:'none',
      
    }
  },
  link:{
    '&:hover':{
      
      color:theme.palette.primary.main
    }
  }
})
export class CardItem extends Component {
  

  render() {
    console.log(this.props)
    const {classes} = this.props
    
    const {
      title,
      description,
      id,
      author,
      goal,
      created_at,
      currency
    } = this.props.card;
    console.log(author)
    // console.log(this.props.card.image[0].url)
    return (

<Link className={classes.card} href={`/campaign/${id}` }>
<Card className={classes.root}>
<CardHeader
avatar=
  {(author.avatar === null) ? (
    
      <Avatar className={classes.avatar}/>
    
  ):
  (
    
    <Avatar aria-label={author.username} className={classes.avatar} src={author.avatar.url}/>
      
    
  
  )}
  
  
  title={<strong><Link component='a' className={classes.link} href={`/profile/${author.username}`}>{author.first_name} {author.last_name}</Link></strong>}
  subheader={<Moment fromNow>{created_at}</Moment>}
/>
<CardMedia
  className={classes.media}
  image={this.props.card.image.url}
  
/>
<CardContent>
  <Typography variant="h6" color="textPrimary" component="p">
  {title}
  </Typography>
  <Typography variant="body2" color="textSecondary" component="p" className={classes.desc}>
  {/* {(description.length > 50)
              ? (
                <>{description
                    .split(" ")
                    .slice(0, 50)
                    .join(" ")}
                  ...</>
              )
              : (
              <>{description}</>
            )
 } */}
 {description}
  </Typography>
</CardContent>
<CardContent>
  {/* <IconButton aria-label="add to favorites">
    <FavoriteIcon />
  </IconButton>
  <IconButton aria-label="share">
    <ShareIcon />
  </IconButton> */}
  
  <Link className={classes.link}  href={`/campaign/${id}` } variant="body2">Read More..</Link>

 
</CardContent>

</Card>
</Link>
    );
  }
}

export default withStyles(useStyles)(CardItem);

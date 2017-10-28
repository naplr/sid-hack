import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import classnames from 'classnames'
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import red from 'material-ui/colors/red'
import FavoriteIcon from 'material-ui-icons/Favorite'
import ShareIcon from 'material-ui-icons/Share'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import InfoOutlineIcon from 'material-ui-icons/InfoOutline'

const styles = theme => ({
  card: {
    maxWidth: 300,
  },
  media: {
    height: 194,
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
})

const defaultImage = 'https://scontent.fbkk4-1.fna.fbcdn.net/v/t31.0-8/22467537_708040952735578_9128939429990221797_o.jpg?_nc_eui2=v1%3AAeEiJ-KYWCYpNaraci2Us9C_-93s7Dx9a5-UgNzbBMqDhyJTbh9R3RF63l3ZLkBEPz0BCx5VP4mKoEHwfS-zE_Tfl4pAx_dcv5lz5O9FPHUw2g&oh=b674c57ce537b9543cf8bbdcfa73b558&oe=5AAD406D'

class PageCard extends Component {
  render() {
    const { classes, page } = this.props
    console.log(page.page_name)

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                R
              </Avatar>
            }
            title={page.page_name}
            subheader={page.page_category}
          />
          <CardMedia
            className={classes.media}
            image={ defaultImage }
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography component="p">
              {`Like: ${page.page_reactions_avg}, Comment: ${page.page_shares_avg}, Shares: ${page.page_shares_avg}`}
            </Typography>
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Detail">
              <InfoOutlineIcon />
            </IconButton>
            <div className={classes.flexGrow} />
          </CardActions>
        </Card>
      </div>
    )
  }
}

PageCard.propTypes = {
  classes: PropTypes.object.isRequired,
  page: PropTypes.object,
}

export default withStyles(styles)(PageCard)
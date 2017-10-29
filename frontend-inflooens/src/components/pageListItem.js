import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper'
import ListItem from 'material-ui/List/ListItem'
import { ListItemSecondaryAction } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import ImageIcon from 'material-ui-icons/Image'
import ListItemText from 'material-ui/List/ListItemText'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'

import IconButton from 'material-ui/IconButton'
import LabelIcon from 'material-ui-icons/Label'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  }
})

class PageListItem extends React.Component {
  render() {
    const { classes, push, page, selectPage } = this.props
    return (
      // <Paper elevation={1} className={classes.root} onClick={() => push(`/pages/${page.id}`)}>
      <Paper elevation={1} className={classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs>
                <Avatar src={page.page_profile} />
              </Grid>
              <Grid item xs={8}>
                <ListItemText primary={page.page_title} secondary={`Posts: ${page.page_post_count}`} onClick={() => push(`/pages/${page.id}`)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs>
                <ListItemText primary={page.page_reactions_avg} secondary="Likes" />
              </Grid>
              <Grid item xs>
                <ListItemText primary={page.page_comments_avg} secondary="Comments" />
              </Grid>
              <Grid item xs>
                <ListItemText primary={page.page_shares_avg} secondary="Shares" />
              </Grid>
              <Grid item xs>
                <IconButton onClick={() => selectPage(page.id)}>
                  <LabelIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

PageListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  page: PropTypes.object
}

const actions = { push }

const styled = withStyles(styles)(PageListItem)
export default connect(null, actions)(styled)
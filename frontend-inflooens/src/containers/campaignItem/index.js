import React from 'react'

import Paper from 'material-ui/Paper'
import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'
import ImageIcon from 'material-ui-icons/Image'
import ListItemText from 'material-ui/List/ListItemText'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  }
});

class CampaignItem extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper elevation={1} className={classes.root}>
        <Grid container justify='center'>
          <Grid item xs justify='center'>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </Grid>
          <Grid item xs={9}>
            <ListItemText primary="Name of Page" secondary="Users: 1,921,511" />
          </Grid>
          <Grid item xs justify='center'>
            <ListItemText primary="1M" secondary="Comments" />
          </Grid>
          <Grid item xs justify='center'>
            <ListItemText primary="15K" secondary="Likes" />
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(styles)(CampaignItem)
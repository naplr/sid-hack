import React from 'react'
import PropTypes from 'prop-types';

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
    const props = this.props;
    const { classes } = props;
    return (
      <Paper elevation={1} className={classes.root}>
        <Grid container>
          <Grid item xs>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </Grid>
          <Grid item xs={8}>
            <ListItemText primary={props.name} secondary="Users: 1,921,511" />
          </Grid>
          <Grid item xs>
            <ListItemText primary="1M" secondary="Comments" />
          </Grid>
          <Grid item xs>
            <ListItemText primary="15K" secondary="Likes" />
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

CampaignItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CampaignItem)
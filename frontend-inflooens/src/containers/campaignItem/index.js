import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper'
import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'
import ImageIcon from 'material-ui-icons/Image'
import ListItemText from 'material-ui/List/ListItemText'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import red from 'material-ui/colors/red'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  }
});

class CampaignItem extends React.Component {
  render() {
    const { classes, push, campaign } = this.props
    console.log(push)
    return (
      // <Link to={`/campaigns/${campaign.id}`}>
      <Paper elevation={1} className={classes.root} onClick={() => push(`/campaigns/${campaign.id}`)}>
        <Grid container>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs>
                <Avatar style={{backgroundColor: red[500]}}>
                  {campaign.name.charAt(0)}
                </Avatar>
              </Grid>
              <Grid item xs={8}>
                <ListItemText primary={campaign.name} secondary={`Pages: ${campaign.total_pages}`} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs>
                <ListItemText primary={campaign.total_pages} secondary="Pages" />
              </Grid>
              <Grid item xs>
                <ListItemText primary={campaign.total_engaged} secondary="Engaged" />
              </Grid>
              <Grid item xs>
                <ListItemText primary={campaign.total_paid} secondary="Paid" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      // </Link>
    )
  }
}

CampaignItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

const actions = { push }

const styled = withStyles(styles)(CampaignItem)
export default connect(null, actions)(styled)
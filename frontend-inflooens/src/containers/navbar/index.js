import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

const styles = theme => ({
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  }
});

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.flex}>
            <img src="/logo-white.svg" height="45px" />
          </div>
          <Button color="contrast">Campaigns</Button>
          <Button color="contrast">Browse</Button>
          {/* <Link to="/home"><Button color="contrast">Campaigns</Button></Link>
          <Link to="/browser"><Button color="contrast">Browse</Button></Link> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
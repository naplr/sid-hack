import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import { red } from 'material-ui/colors';

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
      <AppBar position="static" style={{ background: red[600] }}>
        <Toolbar>
          <Typography type="title" color="inherit" className={classes.flex}>
            Inflooens
          </Typography>
          <Button color="contrast">Project</Button>
          <Button color="contrast">Browse</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
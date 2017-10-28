import React from 'react'

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import Divider from 'material-ui/Divider';

class Home extends React.Component {
  render() {
    return(
      <Grid container>
        <Grid item xs />
        <Grid item xs={10}>
          <div>
            <h1>Home Page</h1>
            <p>Hello Medium!</p>
          </div>
        </Grid>
        <Grid item xs />
      </Grid>
    )
  }
}

export default Home;
import React from 'react'

import Grid from 'material-ui/Grid';

class Home extends React.Component {

  render() {
    return (
      <Grid container style={{ marginTop: '5em', marginBottom: '5em' }}>
        <Grid xs />
        <Grid xs={10}>
          test
        </Grid>
        <Grid xs />
      </Grid>
    )
  }
}

export default Home;
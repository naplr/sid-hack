import React from 'react'

import Grid from 'material-ui/Grid'
import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import { Divider } from 'material-ui'

import { grey } from 'material-ui/colors';

class Footer extends React.Component {
  render() {
    return(
      <Grid container style={{ background: grey[900], color: grey[100] }}>
        <Grid item xs />
          <Grid item xs={10}>
          <div>
            <h1 style={{ fontWeight: 300 }}>Contact</h1>
            <List>
              <ListItem>Facbook</ListItem>
              <Divider />
              <ListItem>Twitter</ListItem>
              <Divider />
              <ListItem>Instagram</ListItem>
            </List>
          </div>
        </Grid>
        <Grid item xs/>
      </Grid>
    )
  }
}

export default Footer;
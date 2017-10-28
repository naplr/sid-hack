import React from 'react'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import List from 'material-ui/List'

import { Add } from 'material-ui-icons'

import { colorPrimary, white } from '../../styles/color'
import CampaignItem from '../campaignItem'

class Home extends React.Component {

  render() {
    return (
      <Grid container style={{ marginTop: '5em', marginBottom: '5em' }}>
        <Grid item xs />
        <Grid item xs={10}>
          <div><h1 style={{ fontWeight: 300 }}>Campaign Management</h1></div>
          <div>
            <Button raised style={{ background: colorPrimary, color: white }}><Add /> Add Campaign</Button>
          </div>
          <div>
            <List>
              { [0,1,2].map(k => <CampaignItem key={k} />) }
            </List>
          </div>
        </Grid>
        <Grid item xs />
      </Grid>
    )
  }
}

export default Home;
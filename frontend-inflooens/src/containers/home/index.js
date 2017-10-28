import React, { Component } from 'react'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import List from 'material-ui/List'
import { map } from 'lodash'

import { Add } from 'material-ui-icons'

import { white } from '../../styles/color'
import CampaignItem from '../campaignItem'
import AddCampaignModel from './addCampaignModel'

class Home extends React.Component {
  state = {
    modelCampaignOpen: false
  }

  handleModelCampaignOpen(open = false) {
    this.setState({
      ...this.state,
      modelCampaignOpen: open
    })
  }

  render() {

    const campaignList = [
      {
        name: 'Campaign A'
      },
      {
        name: 'Campaign B'
      },
      {
        name: 'Campaign C'
      }
    ]

    return (
      <div>
        <AddCampaignModel
          open={this.state.modelCampaignOpen}
          onClose={() => this.handleModelCampaignOpen(false)}
          />
        <Grid container style={{ marginTop: '5em', marginBottom: '5em' }}>
          <Grid item xs />
          <Grid item xs={10}>
            <div><h1 style={{ fontWeight: 300 }}>Campaign Management</h1></div>
            <div>
              <Button raised
                color="primary"
                style={{ color: white }}
                onClick={() => this.handleModelCampaignOpen(true)}><Add /> Add Campaign</Button>
            </div>
            <div style={{ marginTop: '1em' }}>
              <List>
                {
                  map(campaignList, (v,k) => <CampaignItem key={k} name={v.name}/>)
                }
              </List>
            </div>
          </Grid>
          <Grid item xs />
        </Grid>
      </div>
    )
  }
}

export default Home;
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import List from 'material-ui/List'
import { map } from 'lodash'

import { Add } from 'material-ui-icons'

import { white } from '../../styles/color'
import CampaignItem from '../campaignItem'
import AddCampaignModel from './addCampaignModel'
import apiClient from '../../api'
import { getUserCampaigns } from '../../modules/campaign'

class Home extends React.Component {
  state = {
    modelCampaignOpen: false,
  }

  handleModelCampaignOpen(open = false) {
    this.setState({
      ...this.state,
      modelCampaignOpen: open
    })
  }

  addCampaign = name => {
    apiClient.campaign.createCampaign(this.props.userId, name)
      .then(res => {
        this.props.getUserCampaigns(this.props.userId)
        this.setState({
          modelCampaignOpen: false
        })
      })
  }

  render() {
    const { campaigns } = this.props
    if (!campaigns) {
      return null
    }

    return (
      <div>
        <AddCampaignModel
          open={this.state.modelCampaignOpen}
          onClose={() => this.handleModelCampaignOpen(false)}
          onAdd={this.addCampaign}
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
                  campaigns.map((campaign, index) => <CampaignItem key={index} campaign={campaign}/>)
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

const mapStateToProps = state => ({
  campaigns: state.campaign.campaigns,
  userId: state.user.userId
})

const actions = { getUserCampaigns }

export default withRouter(connect(
  mapStateToProps,
  actions,
)(Home))
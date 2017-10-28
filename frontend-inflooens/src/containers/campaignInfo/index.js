import React, { Component } from 'react'

import apiClient from '../../api'

class CampaignInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campaign: null,
      pages: null,
    }
  }

  componentWillMount() {
    const campaignId = this.props.match.params.campaignId

    apiClient.campaign.getCampaignInfo(campaignId)
      .then(campaign => {
        this.setState({
          campaign: campaign
        })
      })

    apiClient.campaign.getCampaignPages(campaignId)
      .then(pages => {
        console.log(pages)
        this.setState({
          pages: pages
        })
      })
  }

  render() {
    if (!this.state.campaign || !this.state.pages) {
      return null
    }

    return (
      <div className='row animated fadeInRight'>
        { this.state.campaign.name }
        { this.state.pages.map(p => p.page.name) }
      </div>
    )
  }
}

export default CampaignInfo
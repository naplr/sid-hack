import React, { Component } from 'react'
import _ from 'lodash'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import List from 'material-ui/List'

import PageCard from '../../components/pageCard'
import apiClient from '../../api'
import PageListItem from '../../components/pageListItem'
import UpdateStatusDialog from './UpdateStatusDialog'
import { translatePageStatus } from '../../common/util'

class CampaignInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campaign: null,
      pages: null,
      isDialogOpen: false,
      selectedPageId: null
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

    this.updatePages(campaignId)
  }

  updatePages = campaignId => {
    apiClient.campaign.getCampaignPages(campaignId)
      .then(pages => {
        this.setState({
          pages: pages
        })
      })
  }

  closeDialog = () => {
    this.setState({
      isDialogOpen: false
    })
  }

  selectPage = selectedPageId => {
    this.setState({
      selectedPageId,
      isDialogOpen: true
    })
  }

  render() {
    if (!this.state.campaign || !this.state.pages) {
      return null
    }

    const grouped = _.groupBy(this.state.pages, p => p.status)

    return (
      <div className='row animated fadeInRight'>
        <Typography type="display3" gutterBottom>
          {`Campaign: ${this.state.campaign.name}`}
        </Typography>
        <List>
          {Object.entries(grouped).map(([status, pages]) => (
            <PagesSection pages={pages} key={status} title={translatePageStatus(status)} selectPage={this.selectPage} />
          ))}
        </List>
        <UpdateStatusDialog
          pageId={this.state.selectedPageId}
          campaignId={this.state.campaign.id}
          open={this.state.isDialogOpen}
          refresh={() => this.updatePages(this.state.campaign.id)}
          closeDialog={this.closeDialog}
        />
      </div>
    )
  }
}

export default CampaignInfo

const PagesSection = ({ title, pages, selectPage }) => <div>
  <Typography type="display1" gutterBottom>
    {title}
  </Typography>
  <List>
    {pages.map(p => <div>
      <PageListItem page={p.page} key={p.id} selectPage={selectPage} />
    </div>)}
  </List>
</div>
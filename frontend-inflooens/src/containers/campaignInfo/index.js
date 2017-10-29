import React, { Component } from 'react'
import _ from 'lodash'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import List from 'material-ui/List'

import Paper from 'material-ui/Paper'
import PageCard from '../../components/pageCard'
import PageGrid from '../../components/PageGrid'
import apiClient from '../../api'
import PageListItem from '../../components/pageListItem'
import UpdateStatusDialog from './UpdateStatusDialog'
import { translatePageStatus } from '../../common/util'
import FunnelChart from '../../components/FunnelChart'

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
        this.setState({ pages })

        if (pages.length > 0) {
          const pageIds = pages.map(p => Number(p.page.page_id))
          return apiClient.page.getRecommenedPages(pageIds)
        } else {
          return []
        }
      })
      .then(recommendedPages => {
        this.setState({ recommendedPages })
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
    if (!this.state.campaign || !this.state.pages || !this.state.recommendedPages) {
      return null
    }

    const grouped = _.groupBy(this.state.pages, p => p.status)
    const funnelData = Object.entries(grouped).map(([status, pages]) => {
      return { label: translatePageStatus(status), value: pages.length }
    })

    return (
      <div>
        <Grid container style={{ margin: '15px'}} justify="center" direction="row">
          <Grid item xs={9}>
            <div><h1 style={{ fontWeight: 300 }}>
              {`Campaign: ${this.state.campaign.name}`}
            </h1></div>
            { this.state.pages.length == 0 
              ? <Grid container justify="center" direction="row" style={{margin: "15px"}}>
                <Typography type="headline" style={{ margin: "45px" }}>
                  No page in this campaign. Let's add some!
                </Typography>
              </Grid>
              : <div>
                <Grid container justify="center" direction="row" style={{margin: "15px"}}>
                  <Grid item xs={6}>
                    <FunnelChart data={funnelData} />
                  </Grid>
                </Grid>
                <List>
                  {Object.entries(grouped).map(([status, pages]) => (
                    <PagesSection pages={pages} key={status} title={translatePageStatus(status)} selectPage={this.selectPage} />
                  ))}
                </List>
                <div><h2 style={{ fontWeight: 300 }}>
                  Suggested Pages
                </h2></div>
                <PageGrid pages={this.state.recommendedPages.slice(0, 6)} countPerRow={3} />

                <UpdateStatusDialog
                  pageId={this.state.selectedPageId}
                  campaignId={this.state.campaign.id}
                  open={this.state.isDialogOpen}
                  refresh={() => this.updatePages(this.state.campaign.id)}
                  closeDialog={this.closeDialog}
                />
              </div>
            }
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default CampaignInfo

const PagesSection = ({ title, pages, selectPage }) => <div style={{ marginBottom: "25px"}}>
  <Typography type="display1" gutterBottom>
    {title}
  </Typography>
  <List>
    {pages.map(p => <div key={p.id}>
      <PageListItem page={p.page} key={p.id} selectPage={selectPage} />
    </div>)}
  </List>
</div>
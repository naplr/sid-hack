import React, { Component } from 'react'
import { connect } from 'react-redux'

import _ from 'lodash'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List'
import Dialog, { DialogTitle } from 'material-ui/Dialog'
import PersonIcon from 'material-ui-icons/Person'
import AddIcon from 'material-ui-icons/Add'
import Typography from 'material-ui/Typography'
import blue from 'material-ui/colors/blue'

import apiClient from '../../api'

const emails = ['username@gmail.com', 'user02@gmail.com']

class AddToCampaignDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      existingCampaigns: null
    }
  }

  componentWillMount() {
    this.getCampaigns(this.props.pageId, this.props.userId)
  }

  componentWillReceiveProps(nextProps) {
    this.getCampaigns(nextProps.pageId, nextProps.userId)
  }

  getCampaigns = (pageId, userId) => {
    apiClient.page.getPageCampaigns(pageId, userId)
      .then(existingCampaigns => {
        this.setState({
          existingCampaigns
        })
      })
  }

  addPageToCampaign = campaignId => {
    apiClient.page.addPageToCampaign(this.props.pageId, campaignId)
      .then(res => {
        this.getCampaigns(this.props.pageId, this.props.userId)
        this.props.closeDialog()
      })
  }

  render() {
    const { campaigns, open, closeDialog, pageId } = this.props

    return (
      <Dialog onRequestClose={closeDialog} open={open}>
        <DialogTitle>Add to Campaign</DialogTitle>
        <div>
          <List>
            { !campaigns || campaigns.length === 0
              ? <Typography type="body1">No active campaign</Typography>
              : campaigns.map(campaign => (
              <ListItem 
                button 
                onClick={() => this.addPageToCampaign(campaign.id)} key={campaign.id}
                disabled={_.includes(this.state.existingCampaigns, campaign.id)} 
              >
                <ListItemText primary={campaign.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    )
  }
}

const mapStateToProps = state => ({
  campaigns: state.campaign.campaigns,
  userId: state.user.userId
})

export default connect(
  mapStateToProps,
  null,
)(AddToCampaignDialog)
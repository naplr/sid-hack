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

const STATUS = {
  Potential: 0,
  Interested: 1,
  Engaged: 2,
  Paid: 4,
  Deleted: 8,
}

class UpdateStatusDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      existingCampaigns: null
    }
  }

  updatePageStatus = status => {
    apiClient.page.updateStatus(this.props.pageId, this.props.campaignId, status)
      .then(res => {
        this.props.refresh()
        this.props.closeDialog()
      })
  }

  render() {
    const { open, closeDialog} = this.props

    return (
      <Dialog onRequestClose={closeDialog} open={open}>
        <DialogTitle>Change Status</DialogTitle>
        <div>
          <List>
            { Object.entries(STATUS).map(([text, value]) => (
              <ListItem 
                button 
                onClick={() => this.updatePageStatus(value)} key={text}
                /* disabled={_.includes(this.state.existingCampaigns, campaign.id)}  */
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    )
  }
}

export default UpdateStatusDialog
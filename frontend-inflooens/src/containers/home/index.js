import React from 'react'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import List from 'material-ui/List'

import { Add } from 'material-ui-icons'

import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


import { white } from '../../styles/color'
import CampaignItem from '../campaignItem'

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
    return (
      <div>
        <Dialog open={this.state.modelCampaignOpen} onRequestClose={() => this.handleModelCampaignOpen(false)}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occationally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleModelCampaignOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleModelCampaignOpen(false)} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
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
                { [0,1,2].map(k => <CampaignItem key={k} />) }
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
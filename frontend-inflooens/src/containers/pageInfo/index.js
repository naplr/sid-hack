import React, { Component } from 'react'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import apiClient from '../../api'
import AddToCampaignDialog from './AddToCampaignDialog'
import PageCard from '../../components/pageCard'

class PageInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: null,
      isDialogOpen: false
    }
  }

  componentWillMount() {
    const pageId = this.props.match.params.pageId
    apiClient.page.getPageInfo(pageId)
      .then(page => {
        this.setState({
          page
        })
      })
  }

  openDialog = () => {
    this.setState({
      isDialogOpen: true
    }) 
  }

  closeDialog = () => {
    this.setState({
      isDialogOpen: false
    })
  }

  render() {
    if (!this.state.page) {
      return null
    }

    return (
      <div>
        {this.state.page.page_name}
        <PageCard page={this.state.page} />
        <Button 
          fab 
          color="primary" 
          style={{ position: 'fixed', right: '1rem', bottom: '1rem' }}
          onClick={this.openDialog}
        >
          <AddIcon />
        </Button>
        <AddToCampaignDialog
          closeDialog={this.closeDialog}
          open={this.state.isDialogOpen}
          pageId={this.state.page.id}
        />
      </div>
    )
  }
}

export default PageInfo
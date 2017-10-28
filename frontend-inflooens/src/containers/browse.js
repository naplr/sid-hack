import React, { Component } from 'react'
import Grid from 'material-ui/Grid';

import PageGrid from '../components/PageGrid'
import apiClient from '../api'

class Browse extends Component {
  state = {
    pages: null
  }

  componentWillMount() {
    apiClient.page.getAllPages()
      .then(pages => {
        this.setState({
          pages
        })
      })
  }

  render() {
    if (!this.state.pages) {
      return null
    }

    return <PageGrid pages={this.state.pages} />
  }
}

export default Browse
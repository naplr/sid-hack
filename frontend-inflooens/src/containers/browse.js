import React, { Component } from 'react'
import Grid from 'material-ui/Grid';

import PageCard from '../components/pageCard'
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

    return (
      <div>
        <div style={{ flexGrow: 1 }}>
          <Grid container spacing={16}>
            {this.state.pages.map(p => (
              <Grid item xs key={p.id}>
                <PageCard page={p} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    )
  }
}

export default Browse
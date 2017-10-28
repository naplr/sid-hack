import React, { Component } from 'react'
import Grid from 'material-ui/Grid';

import PageCard from '../components/PageCard'
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
        <div style={{ margin: '15px' }}>
          <Grid container spacing={16}>
            {this.state.pages.map(p => (
              <Grid item xs={3} key={p.id}>
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
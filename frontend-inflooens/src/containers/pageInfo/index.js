import React, { Component } from 'react'

import apiClient from '../../api'

class PageInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageInfo: null,
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

  render() {
    if (!this.state.page) {
      return null
    }

    return (
      <div className='row animated fadeInRight'>
        { this.state.page.page_name }
      </div>
    )
  }
}

export default PageInfo
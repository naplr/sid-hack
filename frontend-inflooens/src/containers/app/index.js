import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import Login from '../login'
import Home from '../home'
import CampaignInfo from '../campaignInfo'
import PageInfo from '../pageInfo'
import Browse from '../browse'

import { getUserCampaigns } from '../../modules/campaign'

class App extends Component {
  componentWillMount() {
    this.props.getUserCampaigns(this.props.userId)
  }

  render() {
    return (
      <div>
        <main>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/browse" component={Browse} />
            <Route exact path="/campaigns/:campaignId" component={CampaignInfo} />
            <Route exact path="/pages/:pageId" component={PageInfo} />
          </Switch>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.userId
})

const actions = { getUserCampaigns }

export default withRouter(connect(
  mapStateToProps,
  actions,
)(App))
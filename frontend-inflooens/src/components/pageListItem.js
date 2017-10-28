import React from 'react';
import { Route } from 'react-router-dom'
import Login from '../login'
import Home from '../home'
import CampaignInfo from '../campaignInfo'

const PageListItem = ({ pageInfo }) => (
  <div>
    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/campaigns/:campaignId" component={CampaignInfo} />
    </main>
  </div>
)

export default PageListItem
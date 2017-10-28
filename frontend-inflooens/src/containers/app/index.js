import React from 'react';
import { Route } from 'react-router-dom'
import Login from '../login'
import Home from '../home'
import CampaignInfo from '../campaignInfo'
import PageInfo from '../pageInfo'

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/campaigns/:campaignId" component={CampaignInfo} />
      <Route exact path="/pages/:pageId" component={PageInfo} />
    </main>
  </div>
)

export default App
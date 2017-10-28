import React from 'react';
import { Route } from 'react-router-dom'
import Login from '../login'
import Home from '../home'

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/home" component={Home} />
    </main>
  </div>
)

export default App
import React, { Component } from 'react'
import Grid from 'material-ui/Grid'

import PageCard from './pageCard'

const PageGrid = ({ pages }) => (
  <div style={{ margin: '15px' }}>
    <Grid container spacing={16}>
      {pages.map(p => (
        <Grid item xs={3} key={p.id}>
          <PageCard page={p} />
        </Grid>
      ))}
    </Grid>
  </div>
)

export default PageGrid
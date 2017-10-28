import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { withStyles } from 'material-ui/styles'
import classnames from 'classnames'
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import red from 'material-ui/colors/red'
import FavoriteIcon from 'material-ui-icons/Favorite'
import ShareIcon from 'material-ui-icons/Share'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import InfoOutlineIcon from 'material-ui-icons/InfoOutline'
import ListItemText from 'material-ui/List/ListItemText'
import Grid from 'material-ui/Grid'

import D3Funnel from 'd3-funnel'

const data = [
    { label: 'Inquiries', value: 5000 },
    { label: 'Applicants', value: 2500 },
    { label: 'Admits', value: 500 },
    { label: 'Deposits', value: 200 },
];

export default class FunnelChart extends Component {
  componentDidMount() {
    this.redraw()
  }

  componentDidUpdate() {
    this.redraw()
  }

  redraw() {
    const { data } = this.props
    const options = {
        block: {
            dynamicHeight: true,
            minHeight: 15,
        },
    }

    const chart = new D3Funnel('#funnel')
    chart.draw(data, options)
  }

  render() {
    const { classes, page, push } = this.props

    return (
      <div id="funnel">
      </div>
    )
  }
}
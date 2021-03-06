import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Button from 'material-ui/Button'
import { Favorite, Add, Timeline, Comment, Share, People } from 'material-ui-icons'

import apiClient from '../../api'
import AddToCampaignDialog from './AddToCampaignDialog'
import PageCard from '../../components/pageCard'
import Grid from 'material-ui/Grid'
import Card, { CardMedia, CardHeader, CardContent } from 'material-ui/Card';

import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

import { grey, orange, amber, red } from 'material-ui/colors'
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts'
import PageGrid from '../../components/PageGrid'
import FacebookLogin from 'react-facebook-login'

const styles = theme => ({
  miniText: {
    fontSize: '0.95em',
    color: grey[600],
    marginBottom: theme.spacing.unit * 1
  },
  a: {
    textDecoration: 'none',
    color: 'inherit'
  },
  pageName: {
    color: grey[800]
  },
  image: {
    border: '1px solid #ccc'
  },
  boxTitle : {
    color: grey[50],
    display: 'flex',
    alignItems: 'center' 
  }
})

class PageInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: null,
      claiming: false,
      failedClaim: false,
      isDialogOpen: false,
      data: [
        {week: 'Week 1', value: 52},
        {week: 'Week 2', value: 100},
        {week: 'Week 3', value: 76},
        {week: 'Week 4', value: 13},
        {week: 'Week 5', value: 29},
        {week: 'Week 6', value: 57},
        {week: 'Week 7', value: 68},
      ]
    }
  }

  componentWillMount() {
    const pageId = this.props.match.params.pageId
    this.updatePage(pageId)
  }

  componentWillReceiveProps(nextProps) {
    const pageId = nextProps.match.params.pageId
    this.updatePage(pageId)
  }

  updatePage = pageId => {
    apiClient.page.getPageInfo(pageId)
      .then(page => {
        this.setState({ page })

        return apiClient.page.getRecommenedPages([Number(page.page_id)])
        // return []
      })
      .then(recommendedPages => {
        this.setState({ recommendedPages })
      })

  }

  openDialog = () => {
    this.setState({
      isDialogOpen: true
    }) 
  }

  closeDialog = () => {
    this.setState({
      isDialogOpen: false
    })
  }

  claimPage = res => {
    if (this.state.claiming) {
      console.log(res)
      apiClient.page.claimPage(this.state.page.page_id, res.accessToken)
        .then(res => {
          if (!res.success) {
            this.setState({ failedClaim: true })
          } else {
            this.updatePage(this.state.page.id)
          }
        })
    }
  }

  render() {
    const props = this.props
    const classes = props.classes
    const state = this.state
    const page = state.page


    if (!this.state.page || !this.state.recommendedPages) {
      return null
    }

    const monthlyData = [
      {month: '1 Month', value: this.state.page.page_post_1_month_ago},
      {month: '2 Month', value: this.state.page.page_post_2_month_ago},
      {month: '3 Month', value: this.state.page.page_post_3_month_ago},
    ]

    return <div>
      <Grid container style={{ marginTop: '2em', marginBottom: '2em' }}>
        <Grid item xs />
        <Grid item xs={5}>
          <Card>
            <CardMedia
              style={{ height: 300 }}
              image={state.page.page_cover}
              />
            <CardContent>
              <Grid container>
                <Grid item>
                  <img src={state.page.page_profile} style={{ height: 50}} className={classes.image} />
                </Grid>
                <Grid item>    
                  <Typography type="display2" className={classes.pageName}>{state.page.page_title}</Typography>
                  <div style={{ marginBottom: '10px' }} />
                  <div>
                    <div className={classes.miniText}>ID: {state.page.page_id}</div>
                    <div className={classes.miniText}>
                      Site:&nbsp;
                      <a href={'https://facebook.com/' + state.page.page_name} className={classes.a} target='_blank'>
                        {'https://facebook.com/' + state.page.page_name}
                      </a>
                    </div>
                  </div>
                  <Button
                    raised
                    color="primary" 
                    onClick={this.openDialog}
                    >
                    <Add /> Add to Campaign
                  </Button>
                  <AddToCampaignDialog
                    closeDialog={this.closeDialog}
                    open={this.state.isDialogOpen}
                    pageId={this.state.page.id}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* <img src= style={{ height: 300 }} className={classes.image} /> */}
          <div style={{ marginBottom: '20px' }} />
            {/* <Grid item xs={12}> */}
              { this.state.page.claim_status
                ? <ClaimedStat page={this.state.page} boxTitle={classes.boxTitle} />
                : <Grid container justify="center" direction="row">
                  { this.state.failedClaim
                    ? <div>
                      <Typography type="body1" style={{ marginTop: "15px" }}>Unsuccessful claim attempt ...</Typography>
                    </div>
                    : <div style={{ marginTop: "15px" }}>
                      <Typography type="body1" style={{ marginBottom: "15px" }}>Claim your page:</Typography>
                      <FacebookLogin
                        appId="124895991530400"
                        autoLoad={true}
                        fields="name,email,picture"
                        scope="read_insights"
                        callback={res => this.claimPage(res)}
                        cssClass="kep-login-facebook"
                        icon="fa-facebook"
                        onClick={() => this.setState({ claiming: true })}
                      />
                    </div>
                  }
                  </Grid>
              }
          
        </Grid>

        <Grid item xs={5}>
          <Card>
            <CardContent style={{ background: orange[700] }}>
              <div className={classes.boxTitle}><People />&nbsp;Reactions Average</div>
            </CardContent>
            <CardContent>
              <Typography type="display1">{page.page_reactions_avg}</Typography>
            </CardContent>  
          </Card>
          <div style={{ marginBottom: '2em' }} />
          <Card>
            <CardContent style={{ background: amber[700] }}>
              <div className={classes.boxTitle}><Timeline />&nbsp;Post Stat</div>
            </CardContent>
            <CardContent>
              <Typography type="display1">{page.page_post_count}</Typography>
            </CardContent>  
          </Card>
          <div style={{ marginBottom: '0.75em' }} />
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <Card>
                <CardContent style={{ background: amber[600] }}>
                  <div className={classes.boxTitle}><Favorite />&nbsp;Likes</div>
                </CardContent>
                <CardContent>
                  <Typography type="body1">
                    Min: {page.page_reactions_min}<br />
                    Avg: {page.page_reactions_avg}<br />
                    SD: {page.page_reactions_sd}<br />
                    Max: {page.page_reactions_max}
                  </Typography>
                </CardContent>  
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent style={{ background: amber[600] }}>
                  <div className={classes.boxTitle}><Share />&nbsp;Shares</div>
                </CardContent>
                <CardContent>
                  <Typography type="body1">
                    Min: {page.page_shares_min}<br />
                    Avg: {page.page_shares_avg}<br />
                    SD: {page.page_shares_sd}<br />
                    Max: {page.page_shares_max}
                  </Typography>
                </CardContent>  
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent style={{ background: amber[600] }}>
                  <div className={classes.boxTitle}><Comment />&nbsp;Comments</div>
                </CardContent>
                <CardContent>
                  <Typography type="body1">
                    Min: {page.page_comments_min}<br />
                    Avg: {page.page_comments_avg}<br />
                    SD: {page.page_comments_sd}<br />
                    Max: {page.page_comments_max}
                  </Typography>
                </CardContent>  
              </Card>
            </Grid>
          </Grid>
          <div style={{ marginBottom: '1.5em' }} />
          <Card>
            <CardContent style={{ background: amber[500] }}>
              <div className={classes.boxTitle}><People />&nbsp;Post Frequency</div>
            </CardContent>
            <CardContent>
              <BarChart width={400} height={400} data={monthlyData}>
                <XAxis dataKey="month"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Bar dataKey="value" fill={ amber[500] } />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs />
      </Grid>
      <Grid container>
        <Grid item xs />
        <Grid item xs={10}>
          <div><h2 style={{ fontWeight: 300 }}>
            Suggested Pages
          </h2></div>
          <PageGrid pages={this.state.recommendedPages.slice(0, 6)} countPerRow={3} />
        </Grid>
        <Grid item xs />
      </Grid>
    </div>
  }
}

export default withStyles(styles)(PageInfo)

const ClaimedStat = ({ page, boxTitle }) => {
  const fans = JSON.parse(page.page_fans_gender_age)

  // const formatted = [
  //   { age: '35-44', F: 208, M: 266 },
  //   { age: '18-24', F: 10, M: 120 },
  // ]

  const fansMap = Object.entries(fans).reduce((acc, [key, value]) => {
    const [gender, age] = key.split('.')

    if (!acc[age]) {
      acc[age] = {}
    }

    acc[age][gender] = value
    return acc
  }, {})

  const formatted = Object.keys(fansMap).map(age => {
    return { age: age, F: fansMap[age].F, M: fansMap[age].M }
  })

  const last_week_unique_fans_added = page.page_fan_adds_unique
  return <div>
    <Card>
      <CardContent style={{ background: amber[500] }}>
        <div className={boxTitle}><People />&nbsp;User Demographics</div>
      </CardContent>
      <CardContent>
        <BarChart width={400} height={400} data={formatted}>
          <XAxis dataKey="age"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Bar dataKey="F" fill={ amber[500] } />
          <Bar dataKey="M" fill={ red[500] } />
        </BarChart>
      </CardContent>
    </Card>
    {/* <Typography type="body1">{ fans['F.18-24'] }</Typography>
    <Typography type="body1">{ last_week_unique_fans_added }</Typography> */}
  </div>
}
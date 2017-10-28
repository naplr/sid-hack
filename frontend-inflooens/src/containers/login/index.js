import React from 'react'
import FacebookLogin from 'react-facebook-login';

import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import { red, grey } from 'material-ui/colors'

import './login.scss'

class Login extends React.Component {
  responseFacebook(props) {
    return (response) => {
      console.log(response);
      props.changePage('/home');
    }
  }

  render() {
    const props = this.props;
    return (
      <div>
        <Grid container style={{ flexGrow: 1, marginTop: '5em', marginBottom: '5em' }}>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item xs />
              <Grid item xs>
                <Paper style={{ padding: '2em' }}>
                  <Grid container justify="center">
                    <Grid item>
                      <div style={{ width: '100%', padding: '2em' }}>
                        Logo
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container justify="center">
                    <Grid item stlye={{ padding: '2em' }}>
                      <div>Login :</div>
                      <div style={{ marginBottom: '1em' }} />
                      <FacebookLogin
                        appId="124895991530400"
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={this.responseFacebook(props)}
                        cssClass="kep-login-facebook"
                        icon="fa-facebook"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs />
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (site) => push(site)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
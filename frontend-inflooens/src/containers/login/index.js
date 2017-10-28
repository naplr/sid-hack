import React from 'react'
import FacebookLogin from 'react-facebook-login';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import apiClient from '../../api'
import './login.scss'

class Home extends React.Component {
  responseFacebook(props) {
    return (response) => {
      apiClient.user.login(response)
        .then(res => { 
          props.changePage('/home');
        })
    }
  }

  render() {
    const props = this.props;
    return (
        <Grid container style={{ flexGrow: 1, marginTop: '5em', marginBottom: '5em' }}>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item xs />
              <Grid item xs>
                <Paper style={{ padding: '2em' }}>
                  <Grid container justify="center">
                    <Grid item>
                      <div style={{ width: '100%', padding: '2em' }}>
                        <img src="logo.svg" alt="" />
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
    )
  }
}

export default Home;
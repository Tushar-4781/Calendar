import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withRouter } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { message } from "antd"
import Typography from '@material-ui/core/Typography';

import {config} from "../App"


const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      email: "",
      password: "",
    };
  };

  validateInput = () => {
    if (!this.state.email) {
      message.error("Email is a required field");
      return false;
    }
    if (!this.state.password) {
      message.error("Password is a required field");
      return false;
    }
    return true;
  };

  validateResponse = (errored, response) => {
    if (errored || (!response.tokens && !response.message)) {
      message.error(
        "Something went wrong. Check that the backend is running, reachable and returns valid JSON."
      );
      return false;
    }
    if (!response.tokens) {
      message.error(response.message);
      return false;
    }
    return true;
  };

  performAPICall = async () => {
    let response = {};
    let errored = false;
    this.setState({
      loading: true,
    });
    try {
      response = await (
        await fetch(`${config.endpoint}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
          }),
        })
      ).json();
    } catch (e) {
      errored = true;
    }
    this.setState({
      loading: false,
    });
    if (this.validateResponse(errored, response)) {
      return response;
    }
  };

  persistLogin = (token, email, name, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("username", name);
    localStorage.setItem("userId", userId);
  };


  login = async () => {
    // if (this.validateInput()) {
    const response = await this.performAPICall();
    if (response) {
      this.persistLogin(
        response.tokens.access.token,
        response.user.email,
        response.user.name,
        response.user._id
      );
      this.setState({
        email: "",
        password: "",
      });
      this.props.history.push("/calendar");
    }
    // }
  };

  render(){
    const {classes} = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <div className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={(e) => {
                    this.setState({
                      email: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  onChange={(e) => {
                    this.setState({
                      password: e.target.value,
                    });
                  }}
                  id="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {this.login}
            >
              Submit
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    );
  }
}

export default withRouter(withStyles(useStyles)(Login));
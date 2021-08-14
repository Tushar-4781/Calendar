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


class Register extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }


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
        await fetch(`${config.endpoint}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.state.username,
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
  
  register = async () => {
    if(this.state.password===this.state.confirmPassword){
      const response = await this.performAPICall();
      if (response) {
        this.setState({
          username: "",
          password: "",
          confirmPassword: "",
        });
        
        this.props.history.push("/login");
      }
    }
    else{
      alert("Passwords do not match");
    }
  };

  render(){
    const {classes} = this.props;
    return (
      
      <div className="Register-panel"> 
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Your Account
          </Typography>
          <div className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) => {
                    this.setState({
                      username: e.target.value,
                    });
                  }}
                  id="username"
                  label="Username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) => {
                    this.setState({
                      email: e.target.value,
                    });
                  }}
                  id="email"
                  label="Email Address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) => {
                    this.setState({
                      password: e.target.value,
                    });
                  }}
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
                <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) => {
                    this.setState({
                      confirmPassword: e.target.value,
                    });
                  }}
                  label="Confirm-Password"
                  type="password"
                  id="Confirm-Password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {this.register}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>    
      </div>
    );
}
}

// export default Register;
export default withRouter(withStyles(useStyles)(Register));
import React, { useState } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from 'react-router-dom';

//material IU core
import Avatar from '@material-ui/core/Avatar';
//import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import "./Auth.css";
import Navigation from '../Navigation'
import { SignIn } from '../../store/modules/auth/actions/authAction';


//image
import background from '../../Assets/background.jpg';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Login = () => {

  const classes = useStyles();

  const currentState = useSelector((state) => state.Auth);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch()

  const userLogin = (credentials) => dispatch(SignIn(credentials))


  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const submitUser = (e) => {
    e.preventDefault()
    userLogin({
      email: user.email,
      password: user.password
    });
  }

  if(currentState.isAuthenticated){
    return <Redirect to='/' />
  }

    return (
      <div style={{ backgroundImage: `url(${background}) `  }}>
      <div>
          <Navigation />
        </div>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
          <form onSubmit={submitUser}>
          <div className="mb-2">
            { currentState.loginError && currentState.loginError.Incorrect_details ? (
              <small className="color-red">{currentState.loginError.Incorrect_details}</small>
              ) : (
                ""
            )}
            { currentState.loginError && currentState.loginError.No_record ? (
              <small className="color-red">{currentState.loginError.No_record}</small>
              ) : (
                ""
            )}
          </div>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
            { currentState.loginError && currentState.loginError.Required_email ? (
              <small className="color-red">{currentState.loginError.Required_email}</small>
              ) : (
                ""
            )}
            { currentState.loginError && currentState.loginError.Invalid_email ? (
              <small className="color-red">{ currentState.loginError.Invalid_email }</small>
              ) : (
                ""
            )}
            </FormGroup>
            <FormGroup>
            <Label>Password</Label>
            <Input type="password" name="password" placeholder="Enter password" onChange={handleChange}/>
            { currentState.loginError && currentState.loginError.Required_password ? (
              <small className="color-red">{ currentState.loginError.Required_password }</small>
              ) : (
                ""
              )}
              { currentState.loginError && currentState.loginError.Invalid_password ? (
              <small className="color-red">{ currentState.loginError.Invalid_password }</small>
              ) : (
                ""
              )}
              { currentState.loginError && currentState.loginError.Incorrect_password ? (
              <small className="color-red">{ currentState.loginError.Incorrect_password }</small>
              ) : (
                ""
              )}
            </FormGroup>

            { currentState.isLoading ? (
              <Button
                color="primary"
                type="submit"
                block
                disabled
              >
                Login...
              </Button>
            ) : (
              <Button
                color="primary"
                type="submit"
                block
                disabled={ user.email === "" || user.password === ""  }
              >
                Login
            </Button>
            )}
            </form>
            <div className="mt-2" style={{display: "flex", justifyContent: "space-between"}}>
              <div>
                <small><Link to="/signup">Sign Up</Link></small>
              </div>
              <div>
                <small><Link to="/forgotpassword">Forgot Password?</Link></small>
              </div>
            </div>
           
            </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </div>
    );
}

export default Login


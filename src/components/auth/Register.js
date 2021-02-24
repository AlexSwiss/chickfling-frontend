import React, { useState } from "react";
import { Label, Input, FormGroup, Button, Card, CardHeader, CardBody } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from 'react-router-dom';

import "./Auth.css";
import Navigation from '../Navigation'
import { SignUp } from '../../store/modules/auth/actions/authAction';

//image
import background from '../../Assets/background.jpg';


const Register = () => {

  const currentState = useSelector((state) => state.Auth);

  const [user, setUser] = useState({
    username:'',
    email: '',
    bio: '',
    gender: '',
    relationship: '',
    password: ''
  });
  const dispatch = useDispatch()

  const addUser = (credentials) => dispatch(SignUp(credentials))

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const submitUser = (e) => {
    e.preventDefault()
    addUser({
      username: user.username,
      email: user.email,
      bio: user.bio,
      gender: user.gender,
      relationship: user.relationship,
      password: user.password
    });
  }

  if(currentState.isAuthenticated){
    return <Redirect to='/' />
  }

    return (
      <div className="App" id="page-container" style={{ backgroundImage: `url(${background}) `  }}>
        <div>
          <Navigation />
        </div>
        <div className="container Auth">
        <Card className="card-style">
          <CardHeader>Welcome To ChickFling</CardHeader>
          <CardBody>
          <form onSubmit={submitUser}>
          <FormGroup>
            <Label>User Name</Label>
            <Input type="text" name="username" placeholder="Enter username"  onChange={handleChange}/>
            { currentState.signupError && currentState.signupError.Required_username ? (
              <small className="color-red">{currentState.signupError.Required_username}</small>
              ) : (
                ""
              )}
              { currentState.signupError && currentState.signupError.Taken_username ? (
              <small className="color-red">{ currentState.signupError.Taken_username }</small>
              ) : (
                ""
              )}
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
            { currentState.signupError && currentState.signupError.Required_email ? (
              <small className="color-red">{currentState.signupError.Required_email}</small>
              ) : (
                ""
            )}
            { currentState.signupError && currentState.signupError.Invalid_email ? (
              <small className="color-red">{ currentState.signupError.Invalid_email }</small>
              ) : (
                ""
            )}
            { currentState.signupError && currentState.signupError.Taken_email ? (
              <small className="color-red">{ currentState.signupError.Taken_email }</small>
              ) : (
                ""
            )}
            </FormGroup>

            <FormGroup>
            <Label>About you</Label>
            <Input type="textarea" cols="30" rows="6" name="bio" placeholder="tell us a bit about yourself"  onChange={handleChange}/>
            { currentState.signupError && currentState.signupError.Required_bio ? (
              <small className="color-red">{currentState.signupError.Required_bio}</small>
              ) : (
                ""
              )}
              { currentState.signupError && currentState.signupError.Taken_bio ? (
              <small className="color-red">{ currentState.signupError.Taken_bio }</small>
              ) : (
                ""
              )}
          </FormGroup>

          <FormGroup>
            <Label>Gender</Label>
            <Input type="text" name="gender" placeholder="male or female"  onChange={handleChange}/>
            { currentState.signupError && currentState.signupError.Required_gender ? (
              <small className="color-red">{currentState.signupError.Required_gender}</small>
              ) : (
                ""
              )}
              
          </FormGroup>

          <FormGroup>
            <Label>Relationship</Label>
            <Input type="text" name="relationship" placeholder="what your relationship status"  onChange={handleChange}/>
            { currentState.signupError && currentState.signupError.Required_relationship ? (
              <small className="color-red">{currentState.signupError.Required_relationship}</small>
              ) : (
                ""
              )}
              
          </FormGroup>

            <FormGroup>
            <Label>Password</Label>
            <Input type="password" name="password" placeholder="Enter password" onChange={handleChange}/>
            { currentState.signupError && currentState.signupError.Required_password ? (
              <small className="color-red">{ currentState.signupError.Required_password }</small>
              ) : (
                ""
              )}
              { currentState.signupError && currentState.signupError.Invalid_password ? (
              <small className="color-red">{ currentState.signupError.Invalid_password }</small>
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
                Registering...
            </Button>
            ) : (
              <Button
                color="primary"
                type="submit"
                block
                disabled={ user.username === "" || user.email === "" || user.password === ""  }
              >
                Register
            </Button>
            )}
            </form>
            <div className="mt-2">
              <small>Have an account? <Link to="/login">Please login</Link></small>
            </div>
            </CardBody>
          </Card>
        </div>
        
      </div>
    );
}

export default Register

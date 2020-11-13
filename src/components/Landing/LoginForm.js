import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

// @material-ui/core components


// react-bootstrap
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

//Our own style sheet
import "../../styles.scss";


function LoginForm(props) {
  const [homeRedirect, sethomeRedirect] = useState(false);

  //Hook from React-hook-form
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (userInfo) => {
    axios
      .post("/users/login", userInfo)
      .then((response) => {
        sethomeRedirect(true);
        props.handleClose();
        props.login(response.data);
      })
      .catch((err) => alert("wrong credentials!"));
  };

  if (homeRedirect) {
    return <Redirect to="/home" />;
  }
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} className="form-contenant-login">
        <div className="post-event-header">
          <h2 id="transition-modal-title">Welcome Back</h2>
          <Button
            onClick={props.handleClose}
            variant="none"
            type="button"
            id="close-button"
            disableRipple
          >
            <img src="./images/delete.svg" alt="cancel"></img>
          </Button>
        </div>
        <div className="event-form">
          <div className="first-section">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                Email address <span>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                defaultValue="samantha.gadet@gmail.com"
                ref={register({ required: true })}
              />
              {errors.email && (
                <span className="error-message">This field is required</span>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>
                Password <span>*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                defaultValue="password"
                ref={register({ required: true })}
              />
              {errors.password && (
                <span className="error-message">This field is required</span>
              )}
            </Form.Group>
          </div>
        </div>
        <Button
          variant="warning"
          type="submit"
          className="service-alert-button post"
          
        >
          LOG IN
        </Button>
        <hr></hr>
        <p></p>
        <div className="registration">
        <small>
          Don't have an account yet? 
        </small>
        <small><a href="/register">Register here</a></small>
        </div>
        
        
      </Form>
    </div>
  );
}

export default LoginForm;

import React, { useState} from "react";
import { Redirect, NavLink } from "react-router-dom";
import axios from "axios";

// @material-ui/core components
import { Button } from "@material-ui/core";

// react-bootstrap
import { Form } from "react-bootstrap";

//Our own style sheet
import "../../styles.scss";


function Register(props) {

  const [addressRedirect, setAddressRedirect] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validated, setValidated] = useState(false);

  const onChangeHandler = event =>{
    setSelectedFiles(Array.from(event.target.files))
  }

  const onSubmitHandler = function (event) {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    event.preventDefault();

    const data = new FormData()

    selectedFiles.forEach((file, i) => {

      data.append(i, file)
    })

    const firstName = event.target.elements['formBasicFirstname'].value;
    const lastName = event.target.elements['formBasicLastname'].value;
    const email = event.target.elements['formBasicEmail'].value;
    const password = event.target.elements['formBasicPassword'].value;
    const bio = event.target.elements['formBasicBio'].value;
    const phoneNumber = event.target.elements['formBasicPhoneNumber'].value;

    if(selectedFiles.length !==0 && firstName && lastName && email && password){
      axios.post("./images/upload", data).then((response)=> {

        const url = response.data[0].url;
  
          registerUser({
            firstName,
            lastName,
            email,
            password,
            url,
            bio,
            phoneNumber
          });
        })
    }else if (firstName && lastName && email && password){
      registerUser({
        firstName,
        lastName,
        email,
        password,
        bio,
        phoneNumber
      });
    }
  };

  const registerUser = function (registrationData) {
    axios.post("/users/register", registrationData)
      .then((response) => {
        props.register(response.data);
        setAddressRedirect(true);
      }

      )
      .catch((err) => {
        alert("E-Mail is already registered");
      });
  };

  if (addressRedirect) {
    return (
      <Redirect to="/address" />);
  }

  return (
    <div>
    <header className="landing-header">
      <NavLink to="/">
        <div className="logo-container">
          <img src="https://i.imgur.com/j6IJGS2.png" alt="logo" />
          <h4 className="logo">Cup<span>O</span>Sugah</h4>
        </div>
        </NavLink>
    </header>
    <div className="registration-form">
      <Form onSubmit={onSubmitHandler} className="form-contenant" noValidate  validated={validated}>
        <div className="form-header">
          <h2 id="transition-modal-title">Step 1: Enter your information</h2>
        </div>
        <div className="form">
          <div className="first-section">
            <Form.Group controlId="formBasicFirstname" >
              <Form.Label>First Name <span>*</span></Form.Label>
              <Form.Control
                type="firstname"
                placeholder="First name"
                required
              />
              <Form.Control.Feedback type="invalid">
              This field is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicLastname">
              <Form.Label>Last Name <span>*</span></Form.Label>
              <Form.Control
                type="lastname"
                placeholder="Last name"
                required
              />
              <Form.Control.Feedback type="invalid">
              This field is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address <span>*</span></Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                required
              />
              <Form.Control.Feedback type="invalid">
              This field is required
              </Form.Control.Feedback>
            </Form.Group> 

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password <span>*</span></Form.Label>
              <Form.Control type="password" placeholder="Password" required/>
              <Form.Control.Feedback type="invalid">
              This field is required
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="second-section">
          <Form.Group controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Phone Number"
              />
            </Form.Group>
            <Form.Group controlId="formBasicProfilePhoto">
              <Form.Label>Profile Photo</Form.Label>
              <Form.File 
               custom
              >
              <Form.File.Input onChange={onChangeHandler} />
              <Form.File.Label data-browse="Browse">
              {!selectedFiles[0] ? "Select your picture (jpeg, png, gif)" : selectedFiles[0].name }
             </Form.File.Label>
             </Form.File>
            </Form.Group>
            <Form.Group controlId="formBasicBio">
              <Form.Label>Write a Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                type="textarea"
                placeholder="Write something about yourself"
              />
            </Form.Group>
          </div>
        </div>
      <div className="button-container">
         <Button
          variant="warning"
          type="submit"
          className="registration-button"
        >
          <div className="save">
            <div>Next >></div>
          </div>
        </Button>

      </div>
      </Form>
    </div>
    </div>
    
  );
}

export default Register;
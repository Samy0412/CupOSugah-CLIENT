import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

// React bootstrap
import { Form, Button } from "react-bootstrap";

//Our own style sheet
import "../../styles.scss";



function EditUserInformation(props) {
  const [accountRedirect, setAccountRedirect] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);


  const photo = props.user.profile_photo === "https://i.imgur.com/j6IJGS2.png"
  ? ""
  : props.user.profile_photo;

  const onChangeHandler = event =>{
    setSelectedFiles(Array.from(event.target.files))
  }

  const onSubmitHandler = function (event) {
    
    event.preventDefault();

    const firstName = event.target.elements["formBasicFirstname"].value;
    const lastName = event.target.elements["formBasicLastname"].value;
    const email = event.target.elements["formBasicEmail"].value;
    const phoneNumber = event.target.elements["formBasicPhoneNumber"].value;
    const bio = event.target.elements["formBasicBio"].value;

    const data = new FormData()

    selectedFiles.forEach((file, i) => {

      data.append(i, file)
    })

    if(selectedFiles.length !==0){
      axios.post("./images/upload", data).then((response)=> {

        const url = response.data[0].url;
        
    registerUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone_number: phoneNumber,
      profile_photo: url,
      bio: bio,
      id: props.user.id,
    });
  })
}else {
  registerUser({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone_number: phoneNumber,
    profile_photo: photo,
    bio: bio,
    id: props.user.id,
  });

}
  };

  const registerUser = function (registrationData) {
    axios
      .post("/users/edit", registrationData)
      .then((response) => {
        setAccountRedirect(true);
        props.editUser(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  if (accountRedirect) {
    return <Redirect to="/account" />;
  }

  
  return (
    <div>
      <Form onSubmit={onSubmitHandler} className="form-contenant">
        <div className="post-event-header">
          <h2 id="transition-modal-title">Edit Account</h2>
          <Button
            onClick={props.handleClose2}
            variant="none"
            type="button"
            id="close-button"
          >
           <img src="./images/delete.svg" alt="cancel"></img>
          </Button>
        </div>

        <div className="event-form">
          <div className="first-section">
            <Form.Group controlId="formBasicFirstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                defaultValue={props.user.first_name}
                type="firstname"
                placeholder="First name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicLastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                defaultValue={props.user.last_name}
                type="lastname"
                placeholder="Last name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                defaultValue={props.user.email}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                defaultValue={props.user.phone_number}
                type="tel"
                placeholder="Phone Number"
              />
            </Form.Group>
          </div>
          <div className="second-section">
          <Form.Group controlId="formBasicProfilePhoto">
            <Form.Label>Photo</Form.Label>
            <Form.File 
            custom
            >
            <Form.File.Input onChange={onChangeHandler} />
            <Form.File.Label data-browse="Browse">
            {selectedFiles[0]? selectedFiles[0].name : "Select your picture (jpeg, png, gif)"
            }
            </Form.File.Label>
          </Form.File>
        </Form.Group>

            <Form.Group controlId="formBasicBio">
              <Form.Label>Write a Bio</Form.Label>
              <Form.Control
                defaultValue={props.user.bio}
                as="textarea"
                rows="3"
                type="textarea"
                placeholder="Write something about yourself"
              />
            </Form.Group>

            <Button
              variant="outline-warning"
              href="/selectNeighbourhood"
              className="change-neighbourhood"
            >
              Change Neighbourhood
            </Button>
          </div>
        </div>

        <Button
          variant="warning"
          type="submit"
          className="service-alert-button post"
        >
          <div className="save">
            <i class="fa fa-save fa-2x"></i>
            <div>SAVE</div>
          </div>
        </Button>
      </Form>
    </div>
  );
}

export default EditUserInformation;

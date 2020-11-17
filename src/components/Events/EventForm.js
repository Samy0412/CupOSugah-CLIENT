import React, { useState } from 'react'
import axios from "axios";

// React Bootstrap
import { Form, Button } from "react-bootstrap";

// @material-ui/core components
import {
  FormGroup,
} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";

//Helpers
import filterByNeighbourhood from "../Helpers/filterByNeighbourhood";
// import sendSubscriptionSMS from "../Helpers/sendSubscriptionsSMS";

import "../../styles.scss";

//for Material UI
const useStyles = makeStyles((theme) => ({
 input: {
 }
}));

function EventForm(props) {
  const classes = useStyles();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validated, setValidated] = useState(false);

  //Post request to save the event in the database
  const registerEvent = function (registrationData) {
    axios.post("/events", registrationData).then((response) => {
      props.setEvents(
        filterByNeighbourhood(response.data, props.user.neighbourhood_id)
      );
    });
  };

  const onChangeHandler = event =>{
    setSelectedFiles(Array.from(event.target.files))
  }


  //LOGIC AFTER CLICKING ON "POST"
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

    const address = event.target.elements["formBasicAddress"].value;
    const city = event.target.elements["formBasicCity"].value;
    const title = event.target.elements["formBasicTitle"].value;
    const postalCode = event.target.elements["formBasicPostalCode"].value;
    const description = event.target.elements["formBasicDescription"].value;
    
    //Gets the coordinates for the address entered by the user and save info to database
    if(title && props.state.selectedCategory && description && city && postalCode && address
      && props.state.selectedDate){ 
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}+${city}+${postalCode}+CA&key=${process.env.REACT_APP_GEOCODING_KEY}`
      )
      .then((response) => {
        const coordinates = response.data.results[0].geometry.location;
        const formattedCoordinates = `(${coordinates.lat}, ${coordinates.lng})`;
        
        if(selectedFiles.length !==0){
          axios.post("./images/upload", data).then((response)=> {
    
            const url = response.data[0].url;
        
        registerEvent({
          user_id: props.user.id,
          category_id: props.state.selectedCategory,
          neighbourhood_id: props.user.neighbourhood_id,
          title: title,
          coordinates: formattedCoordinates,
          description: description,
          event_photo: url,
          event_start: props.state.selectedDate,
        });
      })
    }else { 
      registerEvent({
        user_id: props.user.id,
        category_id: props.state.selectedCategory,
        neighbourhood_id: props.user.neighbourhood_id,
        title: title,
        coordinates: formattedCoordinates,
        description: description,
        event_start: props.state.selectedDate,
      });
    }
        // sendSubscriptionSMS(props.state.selectedCategory, title,props.categories,props.user);
        props.handleClose();
      });
    }
  };

  const dateChange = (e) => {
    console.log("date after clicking:", e.target.value)
    props.setState({
      ...props.state,
      selectedDate: e.target.value,
    });
  };

  return (
    <Form onSubmit={onSubmitHandler} className="form-contenant" noValidate  validated={validated}>
    <div className="post-event-header">
      <h2 id="transition-modal-title">Post New Event</h2>
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
    {/* <div id="required">
      <span>
        * <small>required fields</small>
      </span>
    </div> */}

    <div className="event-form">
      <div className="first-section">
        <Form.Group controlId="formBasicTitle">
          <Form.Label>
            Event Title <span>*</span>
          </Form.Label>
          <Form.Control type="title" placeholder="Title" required/>
          <Form.Control.Feedback type="invalid">
              This field is required
              </Form.Control.Feedback>
        </Form.Group>
        <FormGroup controlId="formBasicCategory">
          <Form.Label>
            Select Category <span>*</span>
          </Form.Label>
          <Form.Control
            as="select"
            value={props.state.selectedCategory}
            onChange={props.handleChange}
            name="selectedCategory"
            id="formBasicCategory"
            required
          >
            <option></option>
            {props.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
              This field is required
            </Form.Control.Feedback>
        </FormGroup>

        <Form.Group controlId="formBasicDescription" >
          <Form.Label >
            Description <span>*</span>
          </Form.Label>
          <Form.Control
            type="description"
            placeholder="Description"
            as="textarea"
            className="description-height"
            rows="3"
            required
          />
          <Form.Control.Feedback type="invalid">
              This field is required
          </Form.Control.Feedback>
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
          {!selectedFiles[0] ? "Select your picture (jpeg, png, gif)" : selectedFiles[0].name }
         </Form.File.Label>
         </Form.File>
        </Form.Group>        

        <FormGroup controlId="dateAndTime" className="date">
          <Form.Label>
            Date and time <span>*</span>
          </Form.Label>
          <TextField
        id="dateAndTime"
        type="datetime-local"
        defaultValue={props.state.selectedDate}
        selectColor="primary"
        onChange={dateChange}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps ={{className:classes.input}}
      />
        </FormGroup>

        <Form.Group controlId="formBasicAddress">
        <Form.Label>
            Address <span>*</span>
          </Form.Label>
          <Form.Control type="streetName" placeholder="Address line 1" required/>
          <Form.Control.Feedback type="invalid">
              This field is required
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formBasicCity">
          <Form.Control type="city" placeholder="City" required/>
          <Form.Control.Feedback type="invalid">
              This field is required
         </Form.Control.Feedback>
        </Form.Group>


        <Form.Group controlId="formBasicPostalCode">
            <Form.Control type="postal code" placeholder="Postal Code" required/>
            <Form.Control.Feedback type="invalid">
              This field is required
           </Form.Control.Feedback>
        </Form.Group>
        
      </div>
    </div>
    <Button
      variant="warning"
      type="submit"
      className="service-alert-button post"
    >
      POST
    </Button>
  </Form>
  )
}

export default EventForm

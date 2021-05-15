import React, { useState} from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

// react-loading
import ReactLoading from "react-loading"

// @material-ui/core components
import { Button } from "@material-ui/core";

// react-bootstrap
import { Form } from "react-bootstrap";

//Our own style sheet
import "../../styles.scss";

function Address(props) {

  const [neighbourhoodRedirect, setNeighbourhoodRedirect] = useState(false);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading]=useState(false);
  

  const onSubmitHandler = function (event) {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    const address = event.target.elements["formBasicAddress"].value;
    const city = event.target.elements["formBasicCity"].value;
    const postalCode = event.target.elements["formBasicPostalCode"].value;

    event.preventDefault();
    if (address && city && postalCode) {
    setLoading(true);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}+${postalCode}+${city}CA&key=${process.env.REACT_APP_GEOCODING_KEY}`
      )
      .then((response) => {
        const coordinates = response.data.results[0].geometry.location;
        const formattedCoordinates = `(${coordinates.lat}, ${coordinates.lng})`;
        
          registerUser({
            coordinates: formattedCoordinates,
            id: props.user.id
          });
      });
    }
  };

  const registerUser = function (registrationData) {
    axios.post("/users/addAddress", registrationData)
      .then((response) => {
        props.register(response.data);
        setNeighbourhoodRedirect(true);
        setLoading(false);
      })
      .catch((err) => {
        alert(alert(err));
      });
  };

  if (neighbourhoodRedirect) {
    return (
      <Redirect to="/selectNeighbourhood" />);
  }
  return (
    <div>
    <header className="landing-header">
      <Link to="/">
        <div className="logo-container">
          <img src="https://i.imgur.com/j6IJGS2.png" alt="logo" />
          <h4 className="logo">Cup<span>O</span>Sugah</h4>
        </div>
        </Link>
    </header>
    {loading && <ReactLoading className= "loading" type={"spokes"} color={"#2c3e50"} height={"8%"} width={"8%"}/>}
    {!loading && (

      <div className="address-form">
      <Form onSubmit={onSubmitHandler} className="form-contenant" noValidate  validated={validated}>
        <div className="form-header">
          <h2 id="transition-modal-title">Step 2: Enter your address</h2>
        </div>
        <div className="form">

            <Form.Group controlId="formBasicAddress">
              <Form.Label>
              Street <span> *</span>
              </Form.Label>
                    
              <Form.Control
              type="streetNumberandname"
              placeholder="First line of your address"
              required
              />
              <Form.Control.Feedback type="invalid">
              This field is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicCity">
              <Form.Label>
              City <span> *</span>
              </Form.Label>
                    
              <Form.Control
              type="city"
              placeholder="City"
              required
              />
              <Form.Control.Feedback type="invalid">
              This field is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPostalCode">
            <Form.Label>
              Postal code <span>*</span>
              </Form.Label>
              <Form.Control type="city" placeholder="Postal Code" required/>
              <Form.Control.Feedback type="invalid">
              This field is required
              </Form.Control.Feedback>
            </Form.Group>

        <small>Note: Your address will stay private and will never be shared or accessible by other Neighbours.</small>
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
    )}
    </div>
    
  );
}
  

export default Address

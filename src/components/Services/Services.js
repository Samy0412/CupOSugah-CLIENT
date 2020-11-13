import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import ServicePost from "./ServicePost";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Select,
  Modal,
  Backdrop,
  Fade,
  FormGroup,
} from "@material-ui/core";

import Radio from '@material-ui/core/Radio';

import { Form, Button } from "react-bootstrap";

// import styles 
import "../../styles.scss";

import filterByCategory from "../Helpers/filterByCategory";
import filterByNeighbourhood from "../Helpers/filterByNeighbourhood";
// ""../Hooks/useApplicationData"

//for Material UI
const useStyles = makeStyles((theme) => ({
  radio :{
    '&:hover': {
      backgroundColor: 'transparent',
    },
  }, 
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  
}));

moment().format();

function Services(props) {
  const classes = useStyles();

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [state, setState] = useState({
    search: "",
    serviceOffer: "request",
    selectedCategory: "",
  });
  const [validated, setValidated] = useState(false);

  const fetchServices = async () => {
    const services = await axios.get("http://localhost:8001/services");
    setServices(
      filterByNeighbourhood(services.data, props.user.neighbourhood_id)
    );
  };

  const filterAndSetCategories = (filter) => {
    const filtered = props.categories.filter(
      (category) => category.category_type === filter
    );
    setCategories(filtered);
  };

  useEffect(() => {
    fetchServices();
    filterAndSetCategories("Services");
  }, []);

  //////////////////// REFACTOR THESE TOGETHER IF YOU CAN
  function radioChange(event) {
    
    setState({
      ...state,
      serviceOffer: event.target.value,
    });
  }

  function categoryChange(e) {
    setState({
      ...state,
      selectedCategory: e.target.value,
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  ////////////////////////////

  // these functions handle the Modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const requestOrOffer = function (bool) {
    if (bool) return <b>OFFER</b>;
    return <b>REQUEST</b>;
  };

  const fetchFilteredSubscriptions = async (postCategory_id) => {
    const data = await axios.get("/subscriptions");
    const filtered = data.data.filter(
      (subscription) => subscription.category_id === parseInt(postCategory_id)
    );
    const subscriber_ids = filtered.map((entry) => (entry = entry.user_id));
    const phoneData = await axios.get(
      "/users/phone-numbers"
    );
    const phoneFiltered = phoneData.data
      .filter(
        (user) =>
          subscriber_ids.includes(user.id) &&
          user.neighbourhood_id === props.user.neighbourhood_id
      )
      .map((entry) => `+${entry.phone_number}`);
    return phoneFiltered;
  };

  const sendSubscriptionSMS = async function (postCategory_id, title) {
    let categoryName = "";
    for (const category of categories) {
      if (category.id === parseInt(postCategory_id)) {
        categoryName = category.name;
      }
    }
    const phoneNumbers = await fetchFilteredSubscriptions(postCategory_id);
    axios.post("/twilio", { phoneNumbers, categoryName, title });
  };

  const registerService = function (registrationData) {
    axios.post("/services", registrationData).then((response) => {
      setServices(
        filterByNeighbourhood(response.data, props.user.neighbourhood_id)
      );
    });
  };


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

    let offer = false;
    if (state.serviceOffer === "offer"){
      offer = true;
    }
    const address = event.target.elements["formBasicAddress"].value;
    const city = event.target.elements["formBasicCity"].value;
    const title = event.target.elements["formBasicTitle"].value;
    const postalCode = event.target.elements["formBasicPostalCode"].value;
    const description = event.target.elements["formBasicDescription"].value;

    //Gets the coordinates for the address entered by the user and save info to database
    if (title && description && address && postalCode && city){
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

        registerService({
          user_id: props.user.id,
          category_id: state.selectedCategory,
          neighbourhood_id: props.user.neighbourhood_id,
          service_offer: offer,
          title: title,
          coordinates: formattedCoordinates,
          description: description,
          service_photo: url,
        })
      ;})

      }else{

        registerService({
          user_id: props.user.id,
          category_id: state.selectedCategory,
          neighbourhood_id: props.user.neighbourhood_id,
          service_offer: offer,
          title: title,
          coordinates: formattedCoordinates,
          description: description,
        })

      }
        // sendSubscriptionSMS(state.selectedCategory, title);
        handleClose();
      });
    }
  };

  const deleteSubmitHandler = function (event) {
    event.preventDefault();
    const serviceID = parseInt(event.target.dataset.message);
    deleteService({
      user_id: props.user.id,
      service_id: serviceID,
    });
    handleCloseDelete();
  };

  const deleteService = function (registrationData) {
    axios.delete("/services/delete", { data: registrationData }).then(() => {
      fetchServices();
    });
  };

  return (
    <div>
      <div className="container-fluid gedf-wrapper">
        <div className="row">
          <div className="col-lg-2 "></div>
          <div className="col-lg-8 gedf-main">
            {/* </Card> */}
            <div className="all-postings">
              <div className="card gedf-card box">
                <div
                  id="services-alerts-header"
                  className="service-alert-border"
                >
                  <h1>Services</h1>
                </div>
                <div id="services-alerts-title-buttons">
                  <FormControl
                    id="services-alerts-filter-dropdown"
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel
                      htmlFor="outlined-age-native-simple"
                      id="z-index-zero"
                    >
                      Filter By Category
                    </InputLabel>
                    <Select
                      native
                      value={state.search}
                      onChange={handleChange}
                      label="search"
                      inputProps={{
                        name: "search",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  {props.user ? (
                    <div>
                      <Button
                        variant="warning"
                        className="service-alert-button"
                        onClick={handleOpen}
                      >
                        Post New Service
                      </Button>
                      
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={open}>
                          <div>
                            <Form
                              onSubmit={onSubmitHandler}
                              className="form-contenant"
                              noValidate  validated={validated}
                            >
                              <div className="post-event-header">
                                <h2 id="transition-modal-title">
                                  Post New Service
                                </h2>
                                <Button
                                  onClick={handleClose}
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
                                  <Form.Group
                                    controlId="formBasicTitle"
                                    className="serviceTitle"
                                  >
                                    <Form.Label>
                                      Service Title <span>*</span>
                                    </Form.Label>
                                    <Form.Control
                                      type="title"
                                      placeholder="Title"
                                      required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    This field is required
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                  <Form.Group controlId="serviceRequestOrOffer">
                                        <label id="radio"> 
                                          <Radio
                                            disableRipple
                                            className={classes.radio}
                                            color="default"
                                            checked={state.serviceOffer === "request"}
                                            value="request"
                                            name="request"       
                                            onChange={radioChange}
                                            inputProps={{ 'aria-label': 'R' }}
                                          />
                                          <small> Request</small>
                                        </label>

                                        <label id="radio">
                                          <Radio
                                            disableRipple
                                            className={classes.radio}
                                            color="default"
                                            checked={state.serviceOffer === "offer"}
                                            value="offer"
                                            name="offer"
                                            onChange={radioChange}  
                                            inputProps={{ 'aria-label': 'O' }}                                
                                          />
                                          <small>
                                          Offer
                                          </small>
                                          </label>
                                          {" "}
                                          <span>*</span>
                                        
                                  </Form.Group>
                                  

                                  <FormGroup controlId="formBasicCategory">
                                    <Form.Label id="category">
                                      Select Category <span>*</span>
                                    </Form.Label>
                                    <Form.Control
                                      as="select"
                                      value={state.selectedCategory}
                                      onChange={categoryChange}
                                      id="formBasicCategory"
                                      required
                                    >
                                      <option></option>
                                      {categories.map((category) => (
                                        <option
                                          key={category.id}
                                          value={category.id}
                                        >
                                          {category.name}
                                        </option>
                                      ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                    This field is required
                                    </Form.Control.Feedback>
                                  </FormGroup>
                                 
                                  <Form.Group controlId="formBasicPicture">
                                    <Form.Label>Photo</Form.Label>
                                    <Form.File 
                                     custom
                                    >
                                    <Form.File.Input onChange={onChangeHandler} />
                                    <Form.File.Label data-browse="Browse">
                                    {!selectedFiles[0] ? "Select your picture" : selectedFiles[0].name }
                                    </Form.File.Label>
                                    </Form.File>
                                  </Form.Group>
                                </div>
                                <div className="second-section">

                                <Form.Group controlId="formBasicDescription">
                                    <Form.Label>
                                      Description <span>*</span>
                                    </Form.Label>
                                    <Form.Control
                                      type="description"
                                      placeholder="Description"
                                      as="textarea"
                                      rows="3"
                                      required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    This field is required
                                    </Form.Control.Feedback>
                                </Form.Group>
                                  <Form.Group controlId="formBasicAddress" >
                                  <Form.Label>
                                      Address <span>*</span>
                                    </Form.Label>
                                    <Form.Control
                                      type="streetName"
                                      placeholder="First line"
                                      required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    This field is required
                                    </Form.Control.Feedback>
                                  </Form.Group>

                                  <Form.Group controlId="formBasicCity">
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
                                      <Form.Control type="postal code" placeholder="Postal Code" required/>
                                      <Form.Control.Feedback type="invalid">
                                      This field is required
                                      </Form.Control.Feedback>
                                  </Form.Group>
                                </div>
                              </div>
                              <Button
                                variant="warning"
                                className="service-alert-button post"
                                type="submit"
                              >
                                POST
                              </Button>
                            </Form>
                          </div>
                        </Fade>
                      </Modal>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  {/* </CardActionArea> */}
                </div>
              </div>

              {filterByCategory(services, state.search, categories)[0] ? (
                filterByCategory(
                  services,
                  state.search,
                  categories
                ).map((service) => (
                  <ServicePost
                    key={service.id}
                    id={service.id}
                    user_photo={service.profile_photo}
                    user_first_name={service.first_name}
                    user_last_name={service.last_name}
                    time_created={service.time_created}
                    post_photo={service.service_photo}
                    post_description={service.description}
                    post_title={service.title}
                    requestOrOffer={requestOrOffer(service.service_offer)}
                    user_id={service.user_id}
                    current_user_id={props.user.id}
                    handleOpenDelete={handleOpenDelete}
                    handleCloseDelete={handleCloseDelete}
                    openDelete={openDelete}
                    deleteSubmitHandler={deleteSubmitHandler}
                    modalClass={classes.modal}
                    paperClass={classes.paper}
                    receiver={props.receiver}
                    setReceiver={props.receiverData}
                  />
                ))
              ) : (
                <div className="card gedf-card box">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <div id="SA-no-posts"></div>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li id="SA-post-title" className="list-group-item">
                        <h3 className="card-title">
                          No {state.search} Postings at this time
                        </h3>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Services;

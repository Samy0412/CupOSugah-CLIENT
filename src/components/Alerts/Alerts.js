import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import "../../styles.scss";

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
import { Form, Button } from "react-bootstrap";

import AlertPost from "./AlertPost";

// import styles from "./Material-kit-components/landingPage.js";
import "../../styles.scss";

import filterByCategory from "../Helpers/filterByCategory";
import filterByNeighbourhood from "../Helpers/filterByNeighbourhood";

//for Material UI
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  rootCard: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

moment().format();

function Alerts(props) {
  const classes = useStyles();
  const [alerts, setAlerts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [state, setState] = useState({
    search: "",
    selectedCategory: "",
  });
  const [validated, setValidated] = useState(false);

  const fetchAlerts = async () => {
    const alerts = await axios.get("/alerts");
    setAlerts(filterByNeighbourhood(alerts.data, props.user.neighbourhood_id));
  };

  const filterAndSetCategories = (filter) => {
    const filtered = props.categories.filter(
      (category) => category.category_type === filter
    );
    setCategories(filtered);
  };

  useEffect(() => {
    fetchAlerts();
    filterAndSetCategories("Alerts");
  }, []);

  //////////////////// REFACTOR THESE TOGETHER IF YOU CAN
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  function categoryChange(e) {
    setState({
      ...state,
      selectedCategory: e.target.value,
    });
  }

  /////////////////////////

  //these functions handle the Modal
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

  const registerAlert = function (registrationData) {
    axios.post("/alerts", registrationData).then((response) => {
      setAlerts(
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
    
    const address = event.target.elements["formBasicAddress"].value;
    const city = event.target.elements["formBasicCity"].value;
    const postalCode = event.target.elements["formBasicPostalCode"].value;
    const title = event.target.elements["formBasicTitle"].value;
    const description = event.target.elements["formBasicDescription"].value;

    //Gets the coordinates for the address entered by the user and save info to database
    if(title && description && address && city && postalCode && state.selectedCategory) {
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

        registerAlert({
          user_id: props.user.id,
          category_id: state.selectedCategory,
          neighbourhood_id: props.user.neighbourhood_id,
          title: title,
          coordinates: formattedCoordinates,
          description: description,
          alert_photo: url,
        });
      })
    }else {
      registerAlert({
        user_id: props.user.id,
        category_id: state.selectedCategory,
        neighbourhood_id: props.user.neighbourhood_id,
        title: title,
        coordinates: formattedCoordinates,
        description: description,
      });

    }
        // sendSubscriptionSMS(state.selectedCategory, title);
        handleClose();
      });
    }
  };

  const deleteSubmitHandler = function (event) {
    event.preventDefault();
    const alertID = parseInt(event.target.dataset.message);
    deleteAlert({
      user_id: props.user.id,
      alert_id: alertID,
    });
    handleCloseDelete();
  };

  const deleteAlert = function (registrationData) {
    axios.delete("/alerts/delete", { data: registrationData }).then(() => {
      fetchAlerts();
    });
  };


  return (
    <div>
      <div className="container-fluid gedf-wrapper">
        <div className="row" >
          <div className="col-lg-2 "></div>
          <div className="col-lg-8 gedf-main">

            <div className="all-postings">
              <div className="card gedf-card box">
                <div
                  id="services-alerts-header"
                  className="service-alert-border"
                >
                  <h1>Alerts</h1>
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
                      <option aria-label="None" value="">
                        {" "}
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <div>
                    {props.user ? (
                      <div>
                        <Button
                          variant="warning"
                          className="service-alert-button"
                          onClick={handleOpen}
                        >
                          Post New Alert
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
                                noValidate  
                                validated={validated}
                              >
                                <div className="post-event-header">
                                  <h2 id="transition-modal-title">
                                    Post New Alert
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
                                    <Form.Group controlId="formBasicTitle">
                                      <Form.Label>
                                        Alert Title <span>*</span>
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

                                    <FormGroup controlId="formBasicCategory">
                                      <Form.Label>
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

                                    <Form.Group controlId="formBasicDescription">
                                      <Form.Label id="description">
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
                                  </div>
                                  <div className="second-section">
                                  <Form.Group controlId="formBasicProfilePhoto">
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
                                    <Form.Group controlId="formBasicAddress">
                                      <Form.Label>
                                        Address <span>*</span>
                                      </Form.Label>
                                      <Form.Control
                                        type="streetNumber"
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
                                  vvariant="warning"
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
                  </div>
                </div>

              </div>

              {filterByCategory(alerts, state.search, categories)[0] ? (
                filterByCategory(
                  alerts,
                  state.search,
                  categories
                ).map((alert) => (
                  <AlertPost
                    key={alert.id}
                    id={alert.id}
                    user={props.user}
                    user_photo={alert.profile_photo}
                    user_first_name={alert.first_name}
                    user_last_name={alert.last_name}
                    time_created={alert.time_created}
                    post_photo={alert.alert_photo}
                    post_description={alert.description}
                    post_title={alert.title}
                    coordinates={alert.coordinates}
                    user_id={alert.user_id}
                    current_user_id={props.user.id}
                    handleOpenDelete={handleOpenDelete}
                    handleCloseDelete={handleCloseDelete}
                    openDelete={openDelete}
                    deleteSubmitHandler={deleteSubmitHandler}
                    modalClass={classes.modal}
                    paperClass={classes.paper}
                    receiver={props.receiver}
                    setReceiver={props.receiverData}
                    setAlert={props.setAlert}
                  />
                ))
              ) : (
                <div className="box">
                  <div className="card">
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
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-2 "></div>
        </div>
      </div>
    </div>
  );
}

export default Alerts;

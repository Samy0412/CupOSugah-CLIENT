import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Fade } from "@material-ui/core";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "react-bootstrap";

//import components
import EditUserInformation from "./EditUserInformation";
import Notifications from "./Notifications";

import "../../styles.scss";

//for Material UI
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

moment().format();

function Account(props) {
  const classes = useStyles();

  const [neighbourhood, setNeighbourhood] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [nbOfNeighbours, setnbOfNeighbours] = useState(0);

  //Grab the neighbourhood id from the props
  const userNeighbourhoodId = props.user.neighbourhood_id;

  //get the neighbourhood object
  const findNeighbourhood = (id) => {
    axios.get("/neighbourhood").then((response) => {
      const neighbourhoods = response.data;
      const userNeighbourhood = neighbourhoods.find(
        (neighbourhood) => neighbourhood.id === id
      );
      setNeighbourhood(userNeighbourhood);
    });
  };
  const findNumberofNeighbours = (id) => {
    axios.get("/users/profile-info").then((response) => {
      const users = response.data;
      const usersinNeighbourhood = users.filter(
        (user) => user.neighbourhood_id === id
      );
      setnbOfNeighbours(usersinNeighbourhood.length);
    });
  };

  useEffect(() => {
    findNeighbourhood(userNeighbourhoodId);
    findNumberofNeighbours(userNeighbourhoodId);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
 
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  return (
    <div>
      <div id="account-wrapper">
        <div id="account-spreader" >
          <div id="account-center-column" >
            <div className="card box">
              <div id="account-user-info-header" className="card-header">
                <div className="account-header-spreader">
                  <img
                    src={props.user.profile_photo}
                    alt={`${props.user.first_name} ${props.user.last_name}`}
                  ></img>
                  <div className="account-user-name">
                    <div className="h5">
                      {props.user.first_name} {props.user.last_name}
                    </div>
                  </div>
                </div>
                <div className="account-header-spreader-2">
                  <div id="account-header-contact-info">
                    <div>
                      <b>phone number: </b>
                      <span className="text-muted">
                        {props.user.phone_number}
                      </span>
                    </div>
                    <div>
                      <b>email:</b>{" "}
                      <span className="text-muted">{props.user.email}</span>
                    </div>
                  </div>

                  <div id="account-button-group">
                    <Button
                      variant="warning"
                      className="account-button"
                      onClick={handleOpen2}
                    >
                      <div className="button-layout">
                        <EditIcon className="icon" />
                        <div>Edit Account</div>
                      </div>
                    </Button>

                    <Button
                      variant="warning"
                      className="account-button"
                      onClick={handleOpen}
                    >
                      <div className="button-layout">
                        <PhoneIphoneIcon className="icon" />
                        <div >SMS Notifications</div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div id="account-bio" className="h6">
                  <div className="h6 text-muted">About me</div>
                  {props.user.bio}
                </div>
              </div>

              <ul className="list-group list-group-flush">
                <li id="account-neighbourhood" className="list-group-item">
                  <div id="account-single-neighbourhood">
                    <div className="h6 text-muted">Your neighbourhood</div>
                    <div className="h5">{neighbourhood.name}</div>
                  </div>
                  <div id="account-single-neighbours">
                    <div className="h6 text-muted">Total Neighbours</div>
                    <div className="h5">{nbOfNeighbours}</div>
                  </div>
                </li>
               
                <li className="list-group-item">
                  <Link to="/map">
                    <img
                      width="100%"
                      src={neighbourhood.neighbourhood_photo}
                      alt=""
                      className="card-img-bottom"
                    ></img>
                  </Link>
                </li>
              </ul>

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
                  <Notifications 
                  user={props.user}
                  handleClose={handleClose}
                  subscriptions={props.subscriptions}
                  categories={props.categories}
                  updateSubscriptions={props.updateSubscriptions}/>
                  
                </Fade>
              </Modal>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open2}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open2}>
                  <div>
                    <EditUserInformation
                      user={props.user}
                      editUser={props.editUser}
                      handleClose2={handleClose2}
                    />
                  </div>
                </Fade>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;

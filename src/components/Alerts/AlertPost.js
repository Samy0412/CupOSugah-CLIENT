import React from "react";
import "../../styles.scss";
import moment from "moment";
import { Link } from "react-router-dom";

//Material Ui
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, Backdrop, Fade } from "@material-ui/core";

//React-bootstrap
import { Form } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function AlertPost(props) {
  const classes = useStyles();

  const setReceiver = function (data) {
    props.setReceiver(data);
  };

  const setAlert = function (data) {
    props.setAlert(data);
  };

  const alertObject = {
    user: props.user,
    user_photo: props.user_photo,
    user_first_name: props.user_first_name,
    user_last_name: props.user_last_name,
    time_created: props.time_created,
    coordinates: props.coordinates,
    alert_photo: props.post_photo,
    description: props.post_description,
    title: props.post_title,
    receiver: props.receiver,
    setReceiver: props.setReceiver,
    user_id: props.user_id,
  };

  const receiverObject = {
    first_name: props.user_first_name,
    last_name: props.user_last_name,
    user_id: props.user_id,
  };
  return (
    <div className="box">
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <div className="mr-2">
              <img
                className="rounded-circle"
                width="45"
                src={props.user_photo}
                alt=""
              ></img>
            </div>

            <div className="ml-2">
              <div className="h5 m-0">
                {props.user_first_name} {props.user_last_name}
              </div>
              <div className="h7 text-muted">
                {" " + moment(props.time_created).fromNow()}
              </div>
            </div>
            <div id="SA-post-message-or-new">
              
            </div>
          </div>
        </div>

        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li id="SA-post-title" className="list-group-item">
              
              <div id="event-information" >
              <h5 className="card-title">{props.post_title}</h5>
                <div>
                <Link className="message-icon text-muted h7 event-date" to={{ pathname: "/map" }}>
                  <Button variant="warning" id="map-button" className="map-event-post" onClick={() => setAlert(alertObject)} >
                  <i class="fa fa-map-marker"
                    aria-hidden="true"
                    ></i><div>Map</div> 
                  </Button>  
                </Link>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <img className="post-photo" src={props.post_photo} alt=""></img>
            </li>
            <li className="list-group-item">
              <p className="card-text">{props.post_description}</p>
            </li>
          </ul>
          <div id="bottom-button">
          {props.current_user_id === props.user_id ? (
                <div>
                  <Button
                    id="service-post-delete-button"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={props.handleOpenDelete}
                  >
                    DELETE Alert
                  </Button>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={props.openDelete}
                    onClose={props.handleCloseDelete}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={props.openDelete}>
                      <div className="confirmation-popup">
                        <Form
                          data-message={props.id}
                          onSubmit={props.deleteSubmitHandler}
                        >
                          <h5 id="transition-modal-title">
                          Are you sure you would like to delete this Alert?
                        </h5>
                        <div id="confirmation-buttons">
                          <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                          >
                            Confirm
                          </Button>
                          <Button
                            onClick={props.handleCloseDelete}
                            variant="contained"
                            color="primary"
                            type="button"
                          >
                            Cancel
                          </Button>
                          </div>
                        </Form>
                      </div>
                    </Fade>
                  </Modal>
                </div>
              ) : (
                <Link className="message-icon" to={{ pathname: "/Messages" }}>
                <Button variant="warning" id="message-button" onClick={() => setReceiver(receiverObject)}>
                        <div>MESSAGE</div> <SendIcon/>
              </Button>
              </Link>
              )}
         </div>
        </div>
      </div>
    </div>
  );
}

export default AlertPost;

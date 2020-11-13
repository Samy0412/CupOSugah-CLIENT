import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";


// React Bootstrap
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

//Material UI
// import { Button } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";


import "../../styles.scss";


const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9

  },
 
}));

export default function PopupCard(props) {

  moment.locale('en', {
    longDateFormat : {
      L: "DD/MM/YYYY",
  }
  });
  const classes = useStyles();

  const setReceiver = function (data) {
    props.setReceiver(data);
  };

  const receiverObject = {
    first_name: props.user_first_name,
    last_name: props.user_last_name,
    user_id: props.user_id,
  };

  const setEvent = function (data) {
    props.setEvent(data);
  };

  const eventObject = {
    user: props.user,
    user_photo: props.user_photo,
    user_first_name: props.user_first_name,
    user_last_name: props.user_last_name,
    time_created: props.time_created,
    coordinates: props.coordinates,
    event_photo: props.post_photo,
    description: props.post_description,
    title: props.post_title,
    event_time: props.event_time,
    event_start: props.event_start,
    event_date: props.event_date,
    receiver: props.receiver,
    setReceiver: props.setReceiver,
    user_id: props.user_id,
  };

  const deleteSubmitHandler = function (event) {
    event.preventDefault();
    deleteEvent({
      user_id: props.user_id,
      title: props.post_title,
    });
    props.handleClose();
  };

  const deleteEvent = async function (registrationData) {
    await axios.delete("/events/delete", { data: registrationData })
      .then((response) => {
        const x = props.events.filter((event) => event.id !== response.data[0].id)
        props.setEvents(x);
      });
  };

  return (
    <div>
    <div id="event-container">
      <Card className="card-main-container">
      {props.time_created && (
        <CardHeader
          className="popupcard-header"
          avatar={
            <Avatar
              aria-label="recipe"
              alt=""
              src={props.user_photo}
              className={classes.large}
            />
          }
          title={`${props.user_first_name} ${props.user_last_name}`}
          subheader={`Posted ${moment(props.time_created).fromNow()}`}
        />
      )}
      {props.member_since && (
        <CardHeader
          className="popupcard-header"
          avatar={
            <Avatar
              aria-label="recipe"
              alt=""
              src={props.user_photo}
              className={classes.large}
            />
          }
          title={`${props.user_first_name} ${props.user_last_name}`}
          subheader={`Member since ${moment(props.member_since).format("LL")}`}
        />
      )}{" "}
      {props.post_title && (
        <Typography variant="body1" color="textPrimary" component="p">
          {props.post_title}
        </Typography>
      )}
      
      {props.event_start &&  (
      <div id="event-information">
        <div className="text-muted h7 mb-2">
          {" "}
          <i className="fa fa-clock-o"> </i>
          {" " + moment(props.event_start).calendar()}
        </div>
        {!props.isOnMap ? (
         <div > 
         <Link className="message-icon " to={{ pathname: "/map" }}>
         <Button variant="warning" id="map-button"  onClick={() => setEvent(eventObject)}>
          <i
             class="fa fa-map-marker"
             aria-hidden="true"
           ></i><div>Map</div> 
         </Button>  
         </Link>
         </div>
        ) : ("")}
     </div>
        )}
   
      {props.post_photo && (
        <CardMedia
          className={classes.media}
          id="event-photo"
          image={`${props.post_photo}`}
          title="Photo"
        />
      )}
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {props.post_description}
        </Typography>
      </CardContent>
        {props.user.id === props.user_id && !props.isOnMap && (
          <div>
            <br/>
           <Typography variant="body1" component="p" id="delete-event">
           Would you like to delete this event?
         </Typography>
         <Form
           className="popup-buttons"
           data-message={props.event_id}
           onSubmit={deleteSubmitHandler}
         >
            <Button variant="danger" id="delete-event-button" type="submit" onClick={props.handleOpenDelete}>
                <DeleteIcon/><div>Delete Event</div> 
            </Button>
         </Form>
         </div>
        )}
      {props.user.id !== props.user_id && (
         <Link className="message-icon" to={{ pathname: "/Messages" }}>
         <Button variant="warning" id="message-button" onClick={() => setReceiver(receiverObject)}>
                 <div>MESSAGE</div> <SendIcon/>
       </Button>
       </Link>
      )}
     
    </Card>
     {props.isOnMap ? (""):( 
     <Button
      onClick={props.handleClose}
      variant="none"
      type="button"
      id="close-button-event"
      disableRipple
      >
      <img src="./images/delete.svg" alt="cancel"></img>
      </Button>
      )}    
     
    </div>
    
  </div>

  );
}

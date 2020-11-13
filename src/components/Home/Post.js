import React from "react";
import "../../styles.scss";
import moment from "moment";
import { Link } from "react-router-dom";

//Material UI
import SendIcon from '@material-ui/icons/Send';
import { Button } from "@material-ui/core";

function Post(props) {

  moment.locale('en', {
  longDateFormat : {
    L: "DD/MM/YYYY",
}
});
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
    event_start: props.event_start,
    receiver: props.receiver,
    setReceiver: props.setReceiver,
    user_id: props.user_id,
  };

  return (
    <div className="box">
      <div className="card gedf-card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
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
            </div>
          </div>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush post-group">
            <li className="list-group-item">
              <h5 className="card-title">{props.post_title}</h5>
              <div id="event-information" className="text-muted h7 event-date " >
                <div id="event-time">
                <i className="fa fa-clock-o "></i>
                <div>{" " + moment(props.event_start).calendar()}</div>
                </div>
                <div>
                <Link className="message-icon " to={{ pathname: "/map" }}>
                  <Button variant="warning" id="map-button" className="map-event-post"  onClick={() => setEvent(eventObject)}>
                  <i class="fa fa-map-marker"
                    aria-hidden="true"
                    ></i><div>Map</div> 
                  </Button>  
                </Link>
                </div>
              </div>
            </li>
          
          
            <li className="list-group-item">
              <img
                className="eventpost-photo"
                src={props.post_photo}
                alt=""
              ></img>
            </li>
            <li className="list-group-item">
              <p className="card-text">{props.post_description}</p>
            </li>
          </ul>
          {props.user.id !== props.user_id && (
                <Link className="message-icon " to={{ pathname: "/Messages" }}>
                  <Button variant="warning" id="message-button" className="event-post-margins" onClick={() => setReceiver(receiverObject)}>
                  <div>MESSAGE</div> <SendIcon/>
                  </Button>
                </Link>)}
        </div>
      </div>
    </div>
  );
}

export default Post;

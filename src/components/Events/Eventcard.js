import React, { useState, useEffect } from 'react'
import PopupCard from "../Map/PopupCard";
import axios from "axios";

function Eventcard(props) {
  const [selectedEventUser, setSelectedEventUser] = useState(null);

  //Gets user info for selectedEvent
  const getUserForSelectedEvent = (id) => {
    axios.get("/users/profile-info").then((response) => {
      const users = response.data;
      const userForSelectedEvent = users.find((user) => user.id === id);
      setSelectedEventUser(userForSelectedEvent);
    });
  };

  useEffect(() => {
    if (props.selectedEvent) {
      getUserForSelectedEvent(props.selectedEvent.user_id);
    }
  }, [props.selectedEvent]);


  return (
      <div>
                {props.selectedEvent &&
                  selectedEventUser &&
                  (<PopupCard
                      user={props.user}
                      user_photo={selectedEventUser.profile_photo}
                      user_first_name={selectedEventUser.first_name}
                      user_last_name={selectedEventUser.last_name}
                      time_created={props.selectedEvent.time_created}
                      coordinates={props.selectedEvent.coordinates}
                      post_photo={props.selectedEvent.event_photo}
                      post_description={props.selectedEvent.description}
                      post_title={props.selectedEvent.title}
                      event_start={props.selectedEvent.event_start}
                      receiver={props.receiver}
                      setReceiver={props.setReceiver}
                      user_id={props.selectedEvent.user_id}
                      eventSelected={props.eventSelected}
                      setEvent={props.setEvent}
                      isOnMap={false}
                      handleClose={props.handleClose}
                      events={props.events}
                      setEvents={props.setEvents}
                      reloadEvents={props.getFiltredEventsForNeighbourhood}
                    />
                  )}
              </div>
  )
}

export default Eventcard

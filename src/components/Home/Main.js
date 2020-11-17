import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";


function Main(props) {
  //Grabs the neighbourhood id from the props
  const userNeighbourhoodId = props.user.neighbourhood_id;

  const [events, setEvents] = useState([]);
  const [neighbourhood, setneighbourhood] = useState([]);

  //get the neighbourhood object
  const findNeighbourhood = (id) => {
    axios.get("/neighbourhood").then((response) => {
      const neighbourhoods = response.data;
      const userNeighbourhood = neighbourhoods.find(
        (neighbourhood) => neighbourhood.id === id
      );
      setneighbourhood(userNeighbourhood);
    });
  };

  //Gets all the events in the neighbourhood
  const getEventsForNeighbourhood = (id) => {
    axios.get("/events").then((response) => {
      const events = response.data;
      const eventsInNeighbourhood = events.filter(
        (event) => event.neighbourhood_id === id
      );
      setEvents(eventsInNeighbourhood.slice(0, 6));
    });
  };

  useEffect(() => {
    getEventsForNeighbourhood(userNeighbourhoodId);
    findNeighbourhood(userNeighbourhoodId);
  }, [props.user.neighbourhood_id]);
  return (
    <div className="col-lg-6 gedf-main">
      <div className="upcoming-events">
        <div className="card gedf-card box">
          <div id="services-alerts-header">
            <h1>Upcoming events in {neighbourhood.name}</h1>
          </div>
        </div>

        <div></div>
        {events.map(
          (event) =>
            new Date(event.event_start) >= new Date() && (
              <Post
                key={event.id}
                user={props.user}
                user_photo={event.profile_photo}
                user_first_name={event.first_name}
                user_last_name={event.last_name}
                time_created={event.time_created}
                coordinates={event.coordinates}
                post_photo={event.event_photo}
                post_description={event.description}
                post_title={event.title}
                event_start={event.event_start}
                receiver={props.receiver}
                setReceiver={props.setReceiver}
                user_id={event.user_id}
                eventSelected={props.eventSelected}
                setEvent={props.setEvent}
              />
            )
        )}
      </div>
    </div>
  );
}
export default Main;

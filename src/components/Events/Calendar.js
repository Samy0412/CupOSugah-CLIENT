import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";

import filterByCategory from "../Helpers/filterByCategory";
import { Modal, Backdrop, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../../styles.scss";
import Eventcard from "./Eventcard";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Calendar(props) {
  const classes = useStyles();

  //Grab the neighbourhood id from the props
  const userNeighbourhoodId = props.user.neighbourhood_id;
  //Manages the state of the events
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  

  //Gets all the events in the neighbourhood
  const getFiltredEventsForNeighbourhood = (id) => {
    axios.get("/events").then((response) => {
      const events = response.data;
      const eventsInNeighbourhood = events.filter(
        (event) => event.neighbourhood_id === id
      );
      const filtredEvents = filterByCategory(
        eventsInNeighbourhood,
        props.search,
        props.categories
      );
      const formatedEvents = filtredEvents.map((event) => {
        let formattedEvent = Object.assign({}, event);
        formattedEvent.start = event.event_start.slice(0,19);
        
        switch (formattedEvent.category_id) {
          case 12:
            formattedEvent.color = "#6fb1c7";
            break;
          case 13:
            formattedEvent.color = "#ebba34";
            break;
          case 14:
            formattedEvent.color = "#9bc76f";
            break;
          case 15:
            formattedEvent.color = "#d18080";
            break;
          case 16:
            formattedEvent.color = "#b68bc4";
            break;
          case 18:
            formattedEvent.color = "#c79893";
            break;
          case 19:
            formattedEvent.color = "#c793b7";
            break;
          case 20:
            formattedEvent.color = "#93c7ac";
            break;
          case 21:
            formattedEvent.color = "#c7b993";
            break;
          default:
            formattedEvent.color = "#F0E9BF";

        }
        return formattedEvent;
      });
      setEvents(formatedEvents);
    });
  };

  useEffect(() => {
    getFiltredEventsForNeighbourhood(userNeighbourhoodId);
  }, [props.search, props.events]);

  
  const handleOpen = (info) => {
    const title = info.event.title;
    const event_info = info.event.extendedProps;
    const event = {
      ...event_info,
      title: title,
    };
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="box">
      <div className="card" id="calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin]}
          class="calendar-wrapper"
          initialView="dayGridMonth"
          height="80vh"
          themeSystem="standard"
          customButtons={{
            myCustomButton: {
                text: "Post New Event",
                click: function () {
                    props.handleOpen();   
                  }},
          }}
          headerToolbar={{
            left: "myCustomButton",
            center: "title",
            right: "today prev,next",
          }}
          events={events}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}
          eventDisplay="block"
          eventClick={handleOpen}
          dayMaxEventRows={true}
          views={{
            dayGrid: {
              dayMaxEventRows: 4
            } 
          }}
          // backgroundColor="#add3e0"
          // borderColor="#add3e0"
          // eventColor="#6fb1c7"
        />
        <div>
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
              <Eventcard 
              getFiltredEventsForNeighbourhood={getFiltredEventsForNeighbourhood} 
              selectedEvent={selectedEvent} 
              events={events} 
              setEvents={setEvents} 
              handleClose={handleClose} 
              user={props.user}
              setEvent={props.setEvent}
              receiver={props.receiver}
              setReceiver={props.setReceiver}/>
            </Fade>
          </Modal>
        </div>
      </div>
    </div>
  );
}

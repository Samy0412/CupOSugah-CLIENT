import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

// core components
import EventForm from "./EventForm";
import Calendar from "./Calendar";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Select,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";

// import styles from "./Material-kit-components/landingPage.js";
import "../../styles.scss";

import filterByNeighbourhood from "../Helpers/filterByNeighbourhood";

//for Material UI
const useStyles = makeStyles((theme) => ({
 
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

moment().format();

function Events(props) {

  const classes = useStyles();

  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    search: "",
    selectedCategory: "",
    selectedDate: moment().format('YYYY-MM-DDTHH:mm')
  });

  const fetchEvents = async () => {
    const events = await axios.get("/events");
    setEvents(filterByNeighbourhood(events.data, props.user.neighbourhood_id));
  };

  const filterAndSetCategories = (filter) => {
    const filtered = props.categories.filter(
      (category) => category.category_type === filter
    );
    setCategories(filtered);
  };

  useEffect(() => {
    fetchEvents();
    filterAndSetCategories("Events");
  }, []);


  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  // these functions handle the Modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="main">
      <div className="menu">
        <FormControl
          id="services-alerts-filter-dropdown-events"
          variant="outlined"

        >
          <InputLabel htmlFor="outlined-age-native-simple" id="z-index-zero">
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
      </div>
      <div className="modal">
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
          <EventForm 
          user={props.user} 
          handleClose={handleClose} 
          handleChange={handleChange} 
          state={state} 
          setState={setState} 
          setEvents={setEvents} 
          categories={categories}/>
          </Fade>
        </Modal>
      </div>
      <div className="calender">
        <Calendar
          user={props.user}
          events={events}
          search={state.search}
          categories={categories}
          handleOpen={handleOpen}
          receiver={props.receiver}
          setReceiver={props.receiverData}
          eventSelected={props.eventSelected}
          setEvent={props.setEvent}
        />
      </div>
    </div>
  );
}

export default Events;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
import PopupCard from "./PopupCard";
import mapStyles from "./mapStyles";
import Boundaries from "./Boundaries";

// React Bootstrap
import { Button } from "react-bootstrap";

function Map(props) {
  //All the states are managed here
  const [neighbourhoodCenter, setneighbourhoodCenter] = useState({
    lat: 4.538901,
    lng: -5,
  });
  const [neighbourhoodBoundaries, setneighbourhoodBoundaries] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [selectedPinUser, setSelectedPinUser] = useState(null);

  //Grabs the neighbourhood id from the props
  const userNeighbourhoodId = props.user.neighbourhood_id;

  //Finds the neighbourhood coordinates with the neighbourhood id
  const findNeighbourhoodCoordinates = (id) => {
    axios.get("/neighbourhood").then((response) => {
      const neighbourhoods = response.data;
      const userNeighbourhood = neighbourhoods.find(
        (neighbourhood) => neighbourhood.id === id
      );
      const neighbourhoodCenter = { lat:userNeighbourhood.coordinates.x, lng:userNeighbourhood.coordinates.y };
      const neighbourhoodBoundaries = userNeighbourhood.bounds.map((point => {
        return {lat:point.x, lng:point.y}
      }))

      setneighbourhoodBoundaries(neighbourhoodBoundaries);
      setneighbourhoodCenter(neighbourhoodCenter);
    });
  };

  //Gets all the members of the neighbourhood
  const getUsersForNeighbourhood = (id) => {
    axios.get("/users/profile-info").then((response) => {
      const users = response.data;
      const usersInNeighbourhood = users.filter(
        (user) => user.neighbourhood_id === id && user.id !== props.user.id
      );
      setUsers(usersInNeighbourhood);
    });
  };
  //Gets all the events in the neighbourhood
  const getEventsForNeighbourhood = (id) => {
    axios.get("/events").then((response) => {
      const events = response.data;
      const eventsInNeighbourhood = events.filter(
        (event) => event.neighbourhood_id === id
      );
      setEvents(eventsInNeighbourhood);
    });
  };
  //Gets all the services in the neighbourhood
  const getServicesForNeighbourhood = (id) => {
    axios.get("/services").then((response) => {
      const services = response.data;
      const servicesInNeighbourhood = services.filter(
        (service) => service.neighbourhood_id === id
      );
      setServices(servicesInNeighbourhood);
    });
  };
  //Gets all the alerts in the neighbourhood
  const getAlertsForNeighbourhood = (id) => {
    axios.get("/alerts").then((response) => {
      const alerts = response.data;
      const alertsInNeighbourhood = alerts.filter(
        (alert) => alert.neighbourhood_id === id
      );
      setAlerts(alertsInNeighbourhood);
    });
  };
  //Gets user info for selectedPin
  const getUserForSelectedPin = (id) => {
    axios.get("/users/profile-info").then((response) => {
      const users = response.data;
      const userForSelectedPin = users.find((user) => user.id === id);
      setSelectedPinUser(userForSelectedPin);
    });
  };

  useEffect(() => {
    findNeighbourhoodCoordinates(userNeighbourhoodId);
    getUsersForNeighbourhood(userNeighbourhoodId);
    getEventsForNeighbourhood(userNeighbourhoodId);
    getServicesForNeighbourhood(userNeighbourhoodId);
    getAlertsForNeighbourhood(userNeighbourhoodId);
  }, []);

  useEffect(() => {
    if (selectedPin) {
      getUserForSelectedPin(selectedPin.user_id);
    }
  }, [selectedPin]);

  useEffect(()=> {
    if(props.eventSelected.coordinates && !props.ServicesSwitch && !props.EventsSwitch && !props.AlertsSwitch && !props.NeighboursSwitch){
      setSelectedPin(props.eventSelected);
    }
    if(props.alertSelected.coordinates && !props.ServicesSwitch && !props.EventsSwitch && !props.AlertsSwitch && !props.NeighboursSwitch ){
      setSelectedPin(props.alertSelected);
    }
  },[])

  return (
    <GoogleMap
      zoom={15.5}
      center={neighbourhoodCenter}
      defaultOptions={{ styles: mapStyles, disableDefaultUI: true }}
    >
      <Boundaries neighbourhoodBoundaries={neighbourhoodBoundaries} />
      {/* User logged in Marker */}
      <Marker
        key={props.user.id}
        position={{
          lat: props.user.coordinates.x,
          lng: props.user.coordinates.y,
        }}
        icon={{
          url: "/images/map-icons/you_are_here.png",
          scaledSize: new window.google.maps.Size(40, 40),
        }}
      />

      {props.ServicesSwitch &&
        services.map((service) => (
          <Marker
            key={service.id}
            position={{
              lat: service.coordinates.x,
              lng: service.coordinates.y,
            }}
            onClick={() => {
              setSelectedPin(service);
            }}
            icon={{
              url: "/images/map-icons/service.svg",
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          />
        ))}
      {props.EventsSwitch &&
        events.map((event) => (
          <Marker
            key={event.id}
            position={{
              lat: event.coordinates.x,
              lng: event.coordinates.y,
            }}
            onClick={() => {
              setSelectedPin(event);
            }}
            icon={{
              url: "/images/map-icons/event.svg",
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          />
        ))}
      {props.eventSelected.coordinates && !props.ServicesSwitch && !props.EventsSwitch && !props.AlertsSwitch && !props.NeighboursSwitch &&(
        <Marker
          key={props.eventSelected.id}
          position={{
            lat: props.eventSelected.coordinates.x,
            lng: props.eventSelected.coordinates.y,
          }}
          onClick={() => {
            setSelectedPin(props.eventSelected);
          }}
          icon={{
            url: "/images/map-icons/event.svg",
            scaledSize: new window.google.maps.Size(25, 25),
          }}
        />
      )}
      {props.NeighboursSwitch &&
        users.map((user) => (
          <Marker
            key={user.id}
            position={{
              lat: user.coordinates.x,
              lng: user.coordinates.y,
            }}
            onClick={() => {
              setSelectedPin(user);
            }}
            icon={{
              url: "/images/map-icons/neighbour.svg",
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          />
        ))}
      {props.AlertsSwitch &&
        alerts.map((alert) => (
          <Marker
            key={alert.id}
            position={{
              lat: alert.coordinates.x,
              lng: alert.coordinates.y,
            }}
            onClick={() => {
              setSelectedPin(alert);
            }}
            icon={{
              url: "/images/map-icons/alert.svg",
              scaledSize: new window.google.maps.Size(25, 25),
            }}
          />
        ))}
        {props.alertSelected.coordinates && !props.ServicesSwitch && !props.EventsSwitch && !props.AlertsSwitch && !props.NeighboursSwitch && (  
        <Marker
          key={props.alertSelected.id}
          position={{
            lat: props.alertSelected.coordinates.x,
            lng: props.alertSelected.coordinates.y,
          }}
          onClick={() => {
            setSelectedPin(props.alertSelected);
          }}
          icon={{
            url: "/images/map-icons/alert.svg",
            scaledSize: new window.google.maps.Size(25, 25),
          }}
        />
      )}
      {selectedPin && selectedPinUser && (
          <InfoWindow
          onCloseClick={() => {
            setSelectedPin(null);
          }}
          position={{
            lat: selectedPin.coordinates.x,
            lng: selectedPin.coordinates.y,
          }}
        >  
        <div>
        <PopupCard
          user={props.user}
          user_photo={selectedPinUser.profile_photo}
          user_first_name={selectedPinUser.first_name}
          user_last_name={selectedPinUser.last_name}
          time_created={selectedPin.time_created}
          post_photo={
            selectedPin.alert_photo ||
            selectedPin.event_photo ||
            selectedPin.service_photo
          }
          post_description={selectedPin.description}
          post_title={selectedPin.title}
          event_time={selectedPin.event_time}
          event_start={selectedPin.event_start}
          receiver={props.receiver}
          setReceiver={props.setReceiver}
          eventSelected={props.eventSelected}
          setEvent={props.setEvent}
          user_id={selectedPin.user_id}
          isOnMap={true}
          handleClose={() => {
            setSelectedPin(null);
          }}
          />   
          <Button
            onClick={() => {
              setSelectedPin(null);
            }}
            variant="none"
            type="button"
            id="close-button-event-map"
            disableRipple
            >
            <img src="./images/delete.svg" alt="cancel"></img>
          </Button>
          </div>                  
        </InfoWindow>
      )}
      {selectedPin && !selectedPin.user_id && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPin(null);
          }}
          position={{
            lat: selectedPin.coordinates.x,
            lng: selectedPin.coordinates.y,
          }}
        >
          <div>
          <PopupCard
            user_photo={selectedPin.profile_photo}
            user_first_name={selectedPin.first_name}
            user_last_name={selectedPin.last_name}
            user_id={selectedPin.id}
            post_description={selectedPin.bio}
            member_since={selectedPin.time_created}
            receiver={props.receiver}
            setReceiver={props.setReceiver}
            user={props.user}
            eventSelected={props.eventSelected}
            setEvent={props.setEvent}
            isOnMap={true}
            handleClose={() => {
              setSelectedPin(null);
            }}
          />
          <Button
            onClick={() => {
              setSelectedPin(null);
            }}
            variant="none"
            type="button"
            id="close-button-event-map"
            disableRipple
            >
            <img src="./images/delete.svg" alt="cancel"></img>
          </Button>
          </div>   
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default Map;

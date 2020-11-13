import React, { useState } from "react";
import { withScriptjs, withGoogleMap } from "react-google-maps";

import Switchlabels from "./Switchlabels";
import Map from "./Map";
import "../../styles.scss";

function MapPage(props) {
  //Manages the state of the switches
  const [state, setState] = useState({
    Neighbours: false,
    Events: false,
    Services: false,
    Alerts: false,
  });

  //Set the value of the switches
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const WrappedMap = withScriptjs(withGoogleMap(Map));
  return (
    <div>
      <Switchlabels
        handleChange={handleChange}
        NeighboursSwitch={state.Neighbours}
        EventsSwitch={state.Events}
        ServicesSwitch={state.Services}
        AlertsSwitch={state.Alerts}
      />
      <div className="map">
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          user={props.user}
          NeighboursSwitch={state.Neighbours}
          EventsSwitch={state.Events}
          ServicesSwitch={state.Services}
          AlertsSwitch={state.Alerts}
          receiver={props.receiver}
          setReceiver={props.receiverData}
          eventSelected={props.eventSelected}
          alertSelected={props.alertSelected}
          setEvent={props.setEvent}
        />
      </div>
    </div>
  );
}

export default MapPage;

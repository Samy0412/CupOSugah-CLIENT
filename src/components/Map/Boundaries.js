import React from "react";
import { Polygon } from "react-google-maps";

function Boundaries(props) {
  return (
    <Polygon
      paths={props.neighbourhoodBoundaries}
      defaultOptions={{
        strokeColor: "#f7df63",
        strokeOpacity: 0.8,
        strokeWeight: 4,
        fillColor: "#f7df63",
        fillOpacity: 0.35,
      }}
    />
  );
}

export default Boundaries;

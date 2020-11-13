/*global google*/
import React from 'react'
import { GoogleMap } from "react-google-maps";
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager"
import mapStyles from "../Map/mapStyles";

function Map2(props) {

  return (
    <GoogleMap
    defaultZoom={15.5}
    defaultCenter={{
      lat: props.user.coordinates.x,
      lng: props.user.coordinates.y,
    }}
    defaultOptions={{ styles: mapStyles, disableDefaultUI: true }}
  >

      <DrawingManager
      defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
      onPolygonComplete={value => props.getPaths(value)}
      defaultOptions={{
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
  
            google.maps.drawing.OverlayType.POLYGON,
       
          ],
        },
        polygonOptions: {
          strokeColor: "#f7df63",
          strokeOpacity: 0.8,
          strokeWeight: 4,
          fillColor: "#f7df63",
          fillOpacity: 0.35,
          clickable: false,
          editable: true,
          zIndex: 1,
        },
      }}       
            
      />
   
  </GoogleMap>
  );
}

export default Map2;

import React, { useState, useEffect } from "react";
import { Redirect, NavLink } from "react-router-dom";
import axios from "axios";


// @material-ui/core components
import { Button } from "@material-ui/core";

//Our own style sheet
import "../../styles.scss";

function SelectNeighbourhood(props) {

  const [homeRedirect, sethomeRedirect] = useState(false);
  const [neighbourhoods, setNeighbourhoods] = useState([]);

  useEffect(() => {
    props.user.coordinates && axios.get("/neighbourhood").then((response) => {
      const array = response.data;
      console.log("user:",props.user)
      console.log("array:",array)
      for (let neighbourhood of array) {
        neighbourhood.score = Math.sqrt(Math.pow((props.user.coordinates.x - neighbourhood.coordinates.x), 2) + Math.pow((props.user.coordinates.y - neighbourhood.coordinates.y), 2));
      }
      
      const neighbourhoodChoices = array.sort((a, b) => {
        if (a.score < b.score) return -1;
        if (a.score > b.score) return 1;
        return 0;
      });

      setNeighbourhoods(neighbourhoodChoices)
      
    });
      
  }, [props.user]);

  const onAddNeighbourhood = function (event, id) {
    event.preventDefault();
    addNeighbourhood({
      id:props.user.id, 
      neighbourhood_id: id,
    });
  };

  const addNeighbourhood = function (userInfo) {
    axios.post("/users/addNeighbourhood", userInfo)
      .then((response) =>
        props.register(response.data),
      ).then(()=> sethomeRedirect(true));
  };

  if (homeRedirect) {
    return (
      <Redirect to="/home" />);
  }

  return (
    <div>
    <header className="landing-header">
      <NavLink to="/">
        <div className="logo-container">
          <img src="https://i.imgur.com/j6IJGS2.png" alt="logo" />
          <h4 className="logo">Cup<span>O</span>Sugah</h4>
        </div>
        </NavLink>
    </header>
    <div className="select-neighbourhood-container">
      <div className="select-neighbourhood-content-wrapper">
        <div className="select-neighbourhood-header">
          <h2>Step 3: Join a neighbourhood</h2>
        </div>
        <div className="neighbourhood-choices">
        {neighbourhoods && neighbourhoods.slice(0, 2).map(i => (
          <figure key={i.id}>
            <img src={i.neighbourhood_photo} alt={i.name}></img>
            <Button variant="contained" className="neighbourhood-button" type="submit" onClick={(evt) => onAddNeighbourhood(evt, i.id)}>
              {i.name}
            </Button>
          </figure>
        ))}
        </div>
        <div className="select-neighbourhood-footer">
      <h3>You don't see your neighbourhood?</h3>
      <Button variant="contained" className="create-button" href="/createNeighbourhood">Create it now! >></Button> 
    </div>
      </div>
    </div> 
  </div>
  );
}

export default SelectNeighbourhood;


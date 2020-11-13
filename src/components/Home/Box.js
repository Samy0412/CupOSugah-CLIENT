import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../../styles.scss";

function Box(props) {
  const [neighbourhood, setneighbourhood] = useState([]);
  const [nbOfNeighbours, setnbOfNeighbours] = useState(0);
  //Grab the neighbourhood id from the props
  const userNeighbourhoodId = props.user.neighbourhood_id;
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
  const findNumberofNeighbours = (id) => {
    axios.get("/users/profile-info").then((response) => {
      const users = response.data;
      const usersinNeighbourhood = users.filter(
        (user) => user.neighbourhood_id === id
      );
      setnbOfNeighbours(usersinNeighbourhood.length);
    });
  };

  useEffect(() => {
    findNeighbourhood(userNeighbourhoodId);
    findNumberofNeighbours(userNeighbourhoodId);
  }, []);

  return (
    <div className="col-lg-3 ">
      <div className="card box box-left">
        <div className="card-body">
          <div className="h5">
            Welcome {props.user.first_name} {props.user.last_name}!
          </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item border">
            <div className="h6 text-muted">Your neighbourhood</div>
            <div className="h5">{neighbourhood.name}</div>
          </li>
          <li className="list-group-item border">
            <div className="h6 text-muted">Neighbours</div>
            <div className="h5">{nbOfNeighbours}</div>
          </li>
          <li className="list-group-item border">
            <Link to="/map">
              <img
                width="100%"
                src={neighbourhood.neighbourhood_photo}
                alt=""
              ></img>
            </Link>
            <li className="list-group-item ">
              <Button variant="warning" href="/map" className="box-button">
                View map
              </Button>{" "}
            </li>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Box;

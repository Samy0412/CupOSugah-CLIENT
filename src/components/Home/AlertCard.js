import React from "react";
import "../../styles.scss";
import moment from "moment";


export default function AlertCard(props) {
 
  return (
    <div className="alert">
      <div className="card gedf-card">
        <div className="alert-title">
          <i class="fa fa-exclamation-circle fa-2x" aria-hidden="true"></i>
          <h5>{props.title}</h5>
        </div>
        <div className="alert-card">
          <div className="alert-header">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <div className="mr-2">
                  <img
                    className="rounded-circle"
                    width="45"
                    src={props.user_photo}
                    alt=""
                  ></img>
                </div>
                <div className="ml-2">
                  <div className="h5 m-0 ">
                    {props.user_first_name} {props.user_last_name}
                  </div>
                  <div className="h7 text-muted">
                    {" " + moment(props.time_created).fromNow()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item ">
                <img
                  className="caroussel-post-photo "
                  src={props.photo}
                  alt=""
                ></img>
              </li>
              <li className="list-group-item">
                <p className="card-text">{props.description}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

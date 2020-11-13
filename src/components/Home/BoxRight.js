import React from "react";
import AlertsCarousel from "./AlertsCarousel";
import "../../styles.scss";

function BoxRight(props) {
  return (
    <div className="col-lg-3">
      <div className="card box-right">
        <div className="carousel-container">
          <AlertsCarousel
            user={props.user}
            receiver={props.receiver}
            setReceiver={props.setReceiver}
          />
        </div>
      </div>
      {/* <div class="card gedf-card">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" class="card-link">
            Card link
          </a>
          <a href="#" class="card-link">
            Another link
          </a>
        </div>
      </div> */}
    </div>
  );
}

export default BoxRight;

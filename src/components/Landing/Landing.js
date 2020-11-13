import React from "react";

// @material-ui/core components
import { Button } from "@material-ui/core";

//Our own style sheet
import "../../styles.scss";


function Landing(props) {
  return (
    <div>
      <main>
        <section className="presentation">
          <div className="introduction">
            <div className="intro-text">
              <h1>The private social network for your neighbourhood </h1>
              <p>CupOSugah will help you connect with your neighbours.</p>
              <ul>
                <li>
                  <img src="./images/dot.png" alt="dot" />
                  Meet and message your neighbours.
                </li>
                <li>
                  {" "}
                  <img src="./images/dot.png" alt="dot" />
                  Request help or offer your services.
                </li>
                <li>
                  <img src="./images/dot.png" alt="dot" />
                  Create local events or send alerts to the neighbourhood, and receive
                  updates via SMS.
                </li>
              </ul>
            </div>
            <div className="sign-in-container">
              <Button
                className="sign-in-button"
                variant="contained"
                href="/register"
              >
                JOIN NOW!
              </Button>
            </div>
          </div>
          <div className="cover">
            <img src="./images/neighbourhood.png" alt="neighbourhood" />
          </div>
        </section>
      </main>
      <footer>
      <small>Made in <span role="img" aria-label="canada flag">🇨🇦</span></small><small>by Lighthouse Labs students with <span role="img" aria-label="heart">♥️</span> . CupOSugah 2020.</small>
      </footer>
    </div>
  );
}

export default Landing;
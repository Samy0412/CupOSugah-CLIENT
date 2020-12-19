import React, {useState} from "react";

// @material-ui/core components
import { Button } from "@material-ui/core";

//Our own style sheet
import "../../styles.scss";

//reactStrap
import { Alert } from 'reactstrap';

//material-ui icons
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';


function Landing(props) {
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false)
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
        <div className={!visible ? "invisible" : "shadow"}></div>
        {visible  &&
      <div className="alert-container">
      <Alert color="light" isOpen={visible} id="alert">
        <h4>Welcome to <span> CupOSugah</span>!</h4>
        <br></br>
        <p>To experience all of the features of the application, you have to access it by two ways, one after the other :</p>
          <ol>
            <li><strong>Login</strong> with the prefilled user information, which will connect you to an already existing neighbourhood in our database fed with data. </li>
            <li><strong>Logout</strong>  and then <strong>join as a new user</strong> by clicking the button <strong>"Join now!"</strong>. Fill the necessary information. It will then offer you a choice of two existing neighbourhoods in the database that are the closest to you. However there are only three neighbourhoods in our database and only one fed with data, for demonstration purposes. Choose the third option that is to <strong>"create your own neighbourhood"</strong>.  </li>
          </ol>
        <br></br>
        <div className="disclaimer">
        <p className="disclaimer_title"><ReportProblemOutlinedIcon id="disclaimer_icon"/><strong>Important disclaimer :</strong></p>
        <p >If you choose to register with your real contact information and upload personal pictures, note that it could be accessible, even if the database is reset automatically each time a new user is visiting the app. For testing purposes, please don't use personal contact information and pictures that you don't want to share.  </p>
        </div>
        <button onClick={onDismiss} >OK, I get it!</button>
      </Alert>
      </div>
     }
      </main>
      <footer>
      <small>Made in <span role="img" aria-label="canada flag">🇨🇦</span></small><small>by Lighthouse Labs students with <span role="img" aria-label="heart">♥️</span> . CupOSugah 2020.</small>
      </footer>
    </div>
  );
}

export default Landing;
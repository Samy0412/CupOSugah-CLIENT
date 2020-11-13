import React from "react";
import Main from "./Main";
import "../../styles.scss";
import Box from "./Box";
import BoxRight from "./BoxRight";

function Home(props) {
  return (
    <div>
      <div className="container-fluid gedf-wrapper">
        <div className="row">
          <Box user={props.user} />
          <Main
            user={props.user}
            receiver={props.receiver}
            setReceiver={props.receiverData}
            eventSelected={props.eventSelected}
            setEvent={props.setEvent}
          />
          <BoxRight
            user={props.user}
            receiver={props.receiver}
            setReceiver={props.receiverData}
            eventSelected={props.eventSelected}
            setEvent={props.setEvent}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

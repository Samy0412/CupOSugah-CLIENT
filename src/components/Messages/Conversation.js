import React, { useState, useEffect } from "react";
import "../../styles.scss";
import { Form } from "react-bootstrap";
import axios from "axios";


function Conversation(props) {
  const onSubmitHandler = function (event) {
    event.preventDefault();
    const message = event.target.elements["message"].value;
    let messageData ={
      message,
      user_id: props.user.id,
      receiver_id: props.receiver_id,
      conversation_id: props.conversation_id,
    };
    axios.post("/messages/reply", messageData).then((response) => {
      props.conversations(response.data);
    });
    event.target.elements["message"].value = "";
  };


  const [userFirstName, setUserFirstName] = useState([]);
  
  const getUserInfo = function (userID) {
    axios.get(`/messages/userinfo?id=${userID}`).then((response) => {
      setUserFirstName(
        response.data.first_name + " " + response.data.last_name
      );
    });
  };

  const getUserPhoto = function (userID) {
    axios.get(`/messages/userinfo?id=${userID}`).then((response) => {
      props.setUserPhoto(response.data.profile_photo);
    });
  };
  
function gotoBottom(id){
  var element = document.getElementById(id);
  element.scrollTop = element.scrollHeight - element.clientHeight;
}
useEffect(() => {
  gotoBottom("dynamic-content")
}, [props.selectedUserID,props.newConversation])

  return (
    <div className="conversation">
      <figure>
        <div className="user-information">
          {getUserPhoto(props.receiver_id)}
          <h2 className="conversation-header">
            {getUserInfo(props.receiver_id)} {userFirstName}{" "}
          </h2>
        </div>
        <div className="main-content">
          <div id="dynamic-content">
        {props.children}
        </div>
        </div>
        <Form className="message-input" onSubmit={onSubmitHandler}>
          <Form.Group controlId="message">
            <Form.Control
              type="message"
              placeholder="Enter message"
              className="autosize"
            />
          </Form.Group>
          <button>Send</button>
        </Form>
      </figure>
    </div>
  );

}

export default Conversation;

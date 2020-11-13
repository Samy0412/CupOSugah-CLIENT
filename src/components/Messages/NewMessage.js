import React, { useState, useEffect } from "react";

import axios from "axios";
import Conversation from "./Conversation";
import moment from "moment";


function NewMessage(props) {


  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userPhoto, setUserPhoto] = useState([]);

  useEffect(() => {
    axios.get(`/messages/conversation?receiver_id=${props.receiver.user_id}`)
      .then(
        (response) => {
          setConversations(response.data);
        }
      );
  }, [messages]);

  let conversation = [];

  for (let conversationID in conversations) {
    let messagesJSX = [];
    for (let message of conversations[conversationID]) {
      let messageContent = (
        <div className={message.message_text === "New conversation started" ? "new-conversation" : " not-hidden"}>
          <div className={message.sender_id === props.user.id ? " sent" : " received"}>
            <h2 className="message-content">{message.message_text}</h2>
            <h2 className="timestamp">{moment(message.time_sent, "").fromNow()}</h2>
          </div>
        </div>
      );
      messagesJSX.push(messageContent);
    }
    conversation.push(
      <Conversation
        conversation_id={conversationID}
        receiver_id={props.receiver.user_id}
        conversations={setMessages}
        setUserPhoto={setUserPhoto}
        userphoto={userPhoto}
      >
        {messagesJSX}
      </Conversation>);
  }

  return < div className="messages-container" >
    {conversation}
  </div >;
}

export default NewMessage;
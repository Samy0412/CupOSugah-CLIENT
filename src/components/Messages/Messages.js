import React, { useState, useEffect } from "react";
import axios from "axios";
import Conversation from "./Conversation";
import moment from "moment";
import "../../styles.scss";
import SideBar from "./SideBar";
import CurrentConversation from "./CurrentConversation";
import SideBarMobile from "./SideBarMobile";
import CurrentConversationMobile from "./CurrentConversationMobile";

function Messages(props) {

  let conversation = [];

  const [conversations, setConversations] = useState({});
  const [messages, setMessages] = useState([]);
  const [sendersInfo, setSendersInfo]= useState([]);
  const[selectedUserID,setSelectedUserID]= useState(null);
  const [userPhoto, setUserPhoto] = useState([]);
  const [visible, setVisible]= useState(true);
  const[clique, setClique]= useState(false);

  const toggleVisible = ()=> {
    setVisible(!visible)
  }

useEffect(()=>{
 
    if (props.receiver.user_id ){
   
      axios.get(`/messages/conversation?user_id=${props.user.id}&receiver_id=${props.receiver.user_id}`)
        .then(
          (response) => {
            setConversations(response.data);
          }).then (()=>{
            axios.get(`/messages/userMessages?user_id=${props.user.id}`).then((response) => {
              setConversations(response.data);
            }); 
          })
    }
},[props.receiver])

useEffect (()=> {

    axios.get(`/messages/userMessages?user_id=${props.user.id}`).then((response) => {
      setConversations(response.data);
    }); 

}, [messages])

useEffect(()=> {
  toggleVisible();
  setClique(true);
},[props.receiver])
 

  const determineReceiver = function (user_one, user_two) {
    let receiverID = [];
    if (user_one === props.user.id) {
      receiverID = user_two;
    } else if (user_two === props.user.id) {
      receiverID = user_one;
    }
    return receiverID;
  };

  //////Find senders information
   const getSendersInformation = () => {
    axios.get("/users/profile-info").then((response) => {
      const users = response.data;
      let sendersID =[];
     
      for (let conversation in conversations){
        for (let message of conversations[conversation]) {
          if(!sendersID.find(element => element === message.user_one)){
            if(message.user_one !==props.user.id)
            {sendersID.push(message.user_one)}
          }
          if(!sendersID.find(element => element === message.user_two)){
            if(message.user_two !==props.user.id) 
            {sendersID.push(message.user_two)}
          }
        } 
      }
      
      const sendersInformation = users.filter(
        (user) => sendersID.includes(user.id)
      );
      setSendersInfo(sendersInformation);
    });
  };
  

  useEffect(()=>{
    getSendersInformation(); 
  },[conversations,props.receiver,messages])

  /////////
 let timeStamps = {};

  for (let conversationID in conversations) {
    let messagesJSX = [];
    const receiver_id=determineReceiver(
      conversations[conversationID][0].user_one,
      conversations[conversationID][0].user_two
    );
    let timeStamp = conversations[conversationID][conversations[conversationID].length-1].time_sent;
    timeStamps ={...timeStamps, [receiver_id]: timeStamp};
    for (let i=0; i<conversations[conversationID].length; i++) {
      
      let messageContent = (
        <div
          key={i}
          className={
            conversations[conversationID][i].message_text === "New conversation started"
              ? "new-conversation"
              : " not-hidden"
          }
        >
          <div
            className={
              conversations[conversationID][i].sender_id === props.user.id ? " sent" : " received"
            }
          >
            {<img src={userPhoto} alt={conversations[conversationID][i].sender_firstName}/> } 
            <div className="container-2">
            <h2
              className={
                conversations[conversationID][i].message_text.length < 1 ? " hidden" : " message-content"
              }
            >
              {conversations[conversationID][i].message_text}
            </h2>
            <h2 className="timestamp">
              {moment(conversations[conversationID][i].time_sent, "").fromNow()}
            </h2>
            </div>
          </div>
        </div>
      );
      messagesJSX.push(messageContent);
    }

    conversation.push(
      <Conversation
        conversation_id={conversationID}
        receiver_id={receiver_id}
        setReceiver={props.receiverData}
        conversations={setMessages}
        selectedUserID={selectedUserID}
        newConversation={conversations}
        setUserPhoto={setUserPhoto}
        userphoto={userPhoto}
        user={props.user}
      >
        {messagesJSX}
       
      </Conversation>
    );
  }

   const conversationToShow = (conversation)=> {
     if(selectedUserID){
      return(conversation.find(element => element.props.receiver_id === selectedUserID));
     }else if (props.receiver.user_id){
      return(conversation.find(element => element.props.receiver_id === props.receiver.user_id));
     }else {
      return(conversation[0]);
     } 
   }

  return (

    <div>
     {conversation.length === 0 ? (
                <div className="card gedf-card box no-messages">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <div id="SA-no-posts"></div>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li id="SA-post-title" className="list-group-item">
                        <h3 className="card-title">
                          No messages at this time
                        </h3>
                      </li>
                    </ul>
                  </div>
                </div>
              ): (

       <div>
       <div className="chat-application">
       <SideBar sendersInfo ={sendersInfo} setSelectedUserID={setSelectedUserID} timeStamps={timeStamps} clique={clique} setClique={setClique} receiver_id={props.receiver.user_id} selectedUserID={selectedUserID}/>
       <CurrentConversation conversationToShow={conversationToShow} conversation={conversation}/>
       </div>
       <div className="chat-application-mobile">
        <SideBarMobile sendersInfo ={sendersInfo} setSelectedUserID={setSelectedUserID} timeStamps={timeStamps} visible={visible} toggleVisible={toggleVisible}/>
        <CurrentConversationMobile conversationToShow={conversationToShow} conversation={conversation} visible={visible} toggleVisible={toggleVisible}/>
       </div>
       </div>) }
     
    
   </div>

    );
 
}

export default Messages;

import React, {useState} from 'react'
import moment from "moment";



function Sender({id,first_name,last_name,photo, setSelectedUserID, time_sent, toggleVisible, clique, setClique, receiver_id, selectedUserID, index}) {
const [buttonClicked,setButtonClicked]= useState(false);

  const onClick = ()=> {
    if (toggleVisible){
      toggleVisible();
    }
    if(setClique){
      setClique(false);
    }
      
    setButtonClicked(true); 
    setSelectedUserID(id);
  }
 
  const clickedButton = ()=> {
    if(id===receiver_id && clique){
      return "side-bar-button clique"
    }else if (id===selectedUserID && buttonClicked){
          return "side-bar-button clique"
    }else if (!selectedUserID && !receiver_id && index===0){
      return "side-bar-button clique"
    }
    return "side-bar-button"
  }
  return (

    <div >
      <button type="button"  onClick={()=> onClick()}  className={clickedButton()}>
        <img src={photo} alt="user"></img>
        <div className="sender-name">{first_name}{" "}{last_name}</div>
        <small>{moment(time_sent, "").fromNow()}</small>
      </button>
    </div>

  )
}

export default Sender;

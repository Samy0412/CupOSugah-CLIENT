import React from 'react'
import Sender from './Sender'

function SideBarMobile({sendersInfo, setSelectedUserID, timeStamps, visible, toggleVisible}) {
  
    return (
      <div className={visible ? "sidebar" : "hidden"} >
      {sendersInfo.map((sender)=>
        <Sender id ={sender.id} first_name={sender.first_name} last_name={sender.last_name} photo={sender.profile_photo} setSelectedUserID={setSelectedUserID} time_sent={timeStamps[sender.id]} visible={visible} toggleVisible={toggleVisible}/>
      )}
    </div>   
    )
}

export default SideBarMobile;

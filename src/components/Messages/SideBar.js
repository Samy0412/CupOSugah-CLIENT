import React from 'react'
import Sender from './Sender'



function SideBar({sendersInfo, setSelectedUserID, timeStamps, clique, setClique, receiver_id, selectedUserID}) {

  return (
    <div className="sidebar" >
    {sendersInfo.map((sender,index)=>
      <Sender id ={sender.id} first_name={sender.first_name} last_name={sender.last_name} photo={sender.profile_photo} setSelectedUserID={setSelectedUserID} time_sent={timeStamps[sender.id]} clique={clique} setClique={setClique} receiver_id={receiver_id} selectedUserID={selectedUserID} index={index}/>
    )}
  </div>   
  )
}

export default SideBar

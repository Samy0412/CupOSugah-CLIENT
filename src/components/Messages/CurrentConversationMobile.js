import React from 'react'
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function CurrentConversationMobile({conversationToShow, conversation, visible, toggleVisible}) {
  return (
    <div  className={!visible ? "messages-container" : "hidden"} >
      <Button startIcon= {<ArrowBackIosIcon/>}onClick={()=>toggleVisible()} className={!visible ? "back-button" : "hidden"} > Back</Button>
      {conversationToShow(conversation)}
    </div>
  )
}

export default CurrentConversationMobile

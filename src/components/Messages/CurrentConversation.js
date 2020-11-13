import React from 'react'

function CurrentConversation({conversationToShow, conversation}) {
  return (
    <div  className="messages-container" >
      {conversationToShow(conversation)}
    </div>
  )
}

export default CurrentConversation

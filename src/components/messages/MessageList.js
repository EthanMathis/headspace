import React, { useEffect, useState } from 'react'
import { deleteMessage, getMessagesByFriendId } from '../../modules/messageManager'
import { MessageCard } from './MessageCard'

export const MessageList = () => {

    const [messages, setMessages] = useState([])
    
    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const getFriendMessages = (friendId) => {
        getMessagesByFriendId(friendId)
        .then(messages => setMessages(messages))
    }

    const handleDelete = (id) => {
        return deleteMessage(id)
        .then(() => getFriendMessages())
    }

    return (
        <section className="messageBoard">
            <h2>Messages</h2>
            <div className="messageList">
                {messages.map(message =>
                    <MessageCard key={message.id}
                                 message={message}
                                 handleDelete={handleDelete} />)}
            </div>
        </section>
    )   
}

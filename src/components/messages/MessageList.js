import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getMessagesBySongId, addMessage, deleteMessage } from "../../modules/messageManager"
import { MessageCard } from "./MessageCard";

export const MessageList = () => {
    
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState({})
    const { songId } = useParams()

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))
    let songIdInt = parseInt(songId)

    const getConversation = () => {
        getMessagesBySongId(songIdInt)
        .then(response => setMessages(response))
    }

    const handleAddMessage = () => {
        const newMsg = {
            songId: songIdInt,
            userId: loggedInUser,
            message: newMessage.message
        }
        addMessage(newMsg)
        .then(() => {
            getConversation()
            setNewMessage({
                message: ""
            })
        })
    }

    const handleDeleteMessage = (id) => {
        deleteMessage(id)
        .then(() => getConversation())
    }

    const handleInputChange = (event) => {
        const newMsgCopy = {...newMessage}
        let selectedVal = event.target.value
        newMsgCopy[event.target.id] = selectedVal
        setNewMessage(newMsgCopy)
        console.log(newMessage)
    }

    useEffect(() => {
        getConversation()
    }, [])

    return (
        <section className="messagesContainer border border-info rounded m-2 p-2">
            {messages.length > 0 &&
            messages.map(message =>
               <MessageCard key={message.id}
                            message={message}
                            handleDeleteMessage={handleDeleteMessage} /> )}
            
            <div className="d-flex mt-4">
                <input type="text"
                    id="message"
                    className="flex-grow-1"
                    required
                    placeholder="New Message"
                    value={newMessage.message}
                    onChange={handleInputChange} />
                <button type="button" className="btn btn-info btn-sm" onClick={handleAddMessage}>Send</button>
            </div> 
        </section>
    )
}
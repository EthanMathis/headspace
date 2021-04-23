import React, { useEffect, useState } from 'react'
import { deleteMessage, getMessagesByFriendId, getMessagesByUserId, } from '../../modules/messageManager'
import { MessageCard } from './MessageCard'
import { getUserFriends } from "../../modules/friendsManager"

export const MessageList = () => {

    const [messages, setMessages] = useState([])
    const [friends, setFriends] = useState([])
    const [selectedFriendId, setSelectedFriendId] = useState(0)
    
    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const getFriends = () => {
        getUserFriends(loggedInUser)
        .then(response => {
           return setFriends(response)
        })
    }

    const getFriendMessages = (friendId) => {
        getMessagesByFriendId(friendId)
        .then(messages => {
            console.log("messages", messages)
            setMessages(messages)
        })
    }
    
    const handleDropdownInputChange = (event) => {
        let fId = { ...selectedFriendId }
        let selectedVal = event.target.value
            selectedVal = parseInt(selectedVal)
        fId = selectedVal
        setSelectedFriendId(fId)
        getFriendMessages(selectedFriendId)
    }

    
    const handleDelete = (id) => {
        return deleteMessage(id)
        .then(() => getFriendMessages(selectedFriendId))
    }

    useEffect(() => {
        getFriends()
    }, [])

    useEffect(() => {
        getFriendMessages(selectedFriendId)
    }, [])

    return (
        <section className="messageBoard">
            <h2>Messages</h2>
            <select value={friends.userId} name="friendId" id="friendId" onChange={handleDropdownInputChange} className="form-control">
                <option value= "0">Select a Friend</option>
                {friends.map(friend => (
                    <option key={friend.id} value={friend.userId}>
                        {friend.user.name}
                    </option>
                ))}
            </select>
            <div className="messageList">
                {messages.map(message =>
                    <MessageCard key={message.id}
                                 message={message}
                                 handleDelete={handleDelete} />)}
            </div>
        </section>
    )   
}

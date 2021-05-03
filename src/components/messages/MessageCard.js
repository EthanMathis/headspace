import React from "react"

export const MessageCard = ({message, handleDeleteMessage}) => {
    return (
        <div className="message">
            <div>{message.user.name} said:</div>
            <div>{message.message}</div>
            <button type="button" className="btn btn-danger" onClick={() => handleDeleteMessage(message.id)}>Delete</button>
        </div>
    )
}
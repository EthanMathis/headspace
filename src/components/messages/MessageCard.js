import React, { useState } from "react"
import { updateMessage } from "../../modules/messageManager"

export const MessageCard = ({message, handleDeleteMessage}) => {
    const [isEditable, setIsEditable] = useState(false)

    const handleEdit = (event) => {
        if(isEditable) {
            // if isEditable is true we are saving the changes from the message
            const [prefix, messageId] = event.target.id.split("--")
            const updatedMessageText = document.getElementById(`message--${messageId}`).innerText
            const updatedMessage = {
                id: messageId,
                message: updatedMessageText
            }
            updateMessage(updatedMessage)
            setIsEditable(!isEditable)
        } else {
            setIsEditable(!isEditable)
        }
    }
    

    return (
        <div className="d-flex">

            <div className="d-flex border border-primary rounded m-2 p-2">
                <div>
                <div>{message.user.name} said:</div>
                    <div id={`message--${message.id}`} contentEditable={isEditable}>{message.message}</div>
                </div>
            </div>
                    <div className="mt-2">
                        <button className="btn btn-primary btn-sm" id={`update--${message.id}`} onClick={handleEdit}>{isEditable ? "Update" : "Edit"}</button>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteMessage(message.id)}>Delete</button>
                    </div>

        </div>
    )
}
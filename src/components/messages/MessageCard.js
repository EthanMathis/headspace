import React, { useState } from "react"
import { updateMessage } from "../../modules/messageManager"

export const MessageCard = ({message, handleDeleteMessage}) => {
    const [isEditable, setIsEditable] = useState(false)

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

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
        <div className="d-flex justify-content-between">

            <div className="d-flex flex-column border border-primary rounded m-2 p-2" >
            {isEditable && <p className="text-warning rounded mx-auto text-center">Click inside the yellow box to edit</p>}
                <div>
                    <div>
                        <div>{message.user.name} said:</div>
                    </div>
                    <div id={`message--${message.id}`} contentEditable={isEditable} className={isEditable && "border border-warning rounded m-2 p-2"}>{message.message}</div>
                </div>
            </div>
            {message.userId === loggedInUser && 
                    <div className="d-flex flex-column m-2 align-middle">
                        <button className="btn btn-primary btn-sm" id={`update--${message.id}`} onClick={handleEdit}>{isEditable ? "Update" : "Edit"}</button>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteMessage(message.id)}>Delete</button>
                    </div>}

        </div>
    )
}
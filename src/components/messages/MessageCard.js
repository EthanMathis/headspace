import React from "react"

export const MessageCard = ({message, handleDelete}) => {

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    return (
        <article className="messageCard">
            <div className="message">
                <p>{message.user.name}: {message.message}</p>
            
            {message.userId === loggedInUser ?
            <div className="messageButtons">
                <button type="button" className="btn btn-outline-warning">Edit</button>
                <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(message.id)}>Delete</button>
            </div> 
            : null}</div>
        </article>
    )
}
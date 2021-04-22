import React from "react"

export const FriendCard = ({friend, handleDelete}) => {
    
    return (
        <article className="friendCard">
            <h3>{friend.user.name}</h3>
            <button type="button" className="btn btn-outline-success">View {friend.user.name}'s Collection</button>
            <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(friend.id)}>Remove {friend.user.name}</button>
        </article>
    )
}
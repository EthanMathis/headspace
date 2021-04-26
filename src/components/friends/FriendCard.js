import React from "react"
import { Link } from "react-router-dom"

export const FriendCard = ({friend, handleDelete}) => {
    
    return (
        <article className="friendCard">
            <h3>{friend.user.name}</h3>
            <Link to={`/friendCollection/${friend.user.id}`}>
                <button type="button" className="btn btn-outline-success">View {friend.user.name}'s Collection</button>
            </Link>
            <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(friend.id)}>Remove {friend.user.name}</button>
        </article>
    )
}
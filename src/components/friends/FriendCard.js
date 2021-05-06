import React from "react"
import { Link } from "react-router-dom"

export const FriendCard = ({friend, handleDelete, setFriendId }) => {
    
    return (
        <article className="d-flex flex-column border border-info rounded m-2 p-2 text-center">
            <h3>{friend.user.name}</h3>
                <button type="button" className="btn btn-outline-info m-1 p-1" onClick={() => setFriendId(friend.user.id)}>View {friend.user.name}'s Collection</button>
            <button type="button" className="btn btn-outline-danger m-1 p-1" onClick={() => handleDelete(friend.id)}>Remove {friend.user.name}</button>
        </article>
    )
}
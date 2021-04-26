import React from "react"
import { Link } from "react-router-dom"



export const FriendSongCard = ({song}) => {
    return (
        <article className="friendSongCard">
            <h3>{song.title}</h3>
            <h4>Written By: {song.user.name}</h4>
            <Link to={`/friendSong/${song.id}`}>
                <button type="button" className="btn btn-outline-primary">View</button>
            </Link>
        </article>
    )
}
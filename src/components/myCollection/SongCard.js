import React from "react"
import { Link } from "react-router-dom"



export const SongCard = ({song}) => {
    return (
        <article className="songCard">
            <h3>{song.title}</h3>
            <h4>Written By: {song.user.name}</h4>
            <Link to={`/song/${song.id}/edit`}>
                <button type="button" className="btn btn-primary">Edit</button>
            </Link>
        </article>
    )
}
import React from "react"
import { Link } from "react-router-dom"



export const SongCard = ({song, handleDelete}) => {
    return (
        <article className="songCard">
            <h3>{song.title}</h3>
            <h4>Written By: {song.user.name}</h4>
            <Link to={`/song/${song.id}/view`}>
                <button type="button" className="btn btn-warning">View</button>
            </Link>
            <Link to={`/song/${song.id}/edit`}>
                <button type="button" className="btn btn-primary">Edit</button>
            </Link>
            <button type="button" className="btn btn-danger" onClick={() => handleDelete(song.id)}>Delete</button>
        </article>
    )
}
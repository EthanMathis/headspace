import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getUserSongsBySongId } from "../../modules/userSongManager"



export const FriendSongCard = ({song}) => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const [canEdit, setCanEdit] = useState({})

    const canYouEdit = () => {
        return getUserSongsBySongId(song.id)
        .then(response => {
            setCanEdit(response.find(request => request.userId === loggedInUser))
        })
    } 
    
    useEffect(() => {
        canYouEdit()
    }, [])

    return (
        <article className="friendSongCard">
            <h3>{song.title}</h3>
            <h4>Written By: {song.user.name}</h4>
            <Link to={`/friendSong/${song.id}`}>
                <button type="button" className="btn btn-outline-warning">View</button>
            </Link>
            {canEdit?.canEdit &&  
            <Link to={`/friendSong/${song.id}/edit`}>
            <button type="button" className="btn btn-outline-primary">Edit</button>
            </Link>}
            
        </article>
    )
}
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
        <article className="border border-info rounded w-75 m-2 p-2 mx-auto">
            <h3>{song.title}</h3>
            <h4>Written By: {song.user.name}</h4>
                <div className="text-center">
                    <Link to={`/friendSong/${song.id}`}>
                        <button type="button" className="btn btn-outline-info">View</button>
                    </Link>
                    {canEdit?.canEdit &&  
                    <Link to={`/friendSong/${song.id}/edit`}>
                    <button type="button" className="btn btn-outline-primary">Edit</button>
                    </Link>}
                </div>
            
        </article>
    )
}
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getSongById } from '../../modules/songManager';
import { denyUserSong, getUserSongsBySongId } from "../../modules/userSongManager";
import { CollabRequestCard } from "./CollabRequestCard";

export const MySongView = () => {
    const [mySong, setMySong] = useState({})
    const { songId } = useParams()
    const [collabRequest, setCollabRequest] = useState([])

    const getMySong = () => {
        getSongById(songId)
        .then(response => {
            return setMySong(response)
        })
    }

    const checkForCollab = () => {
        const currentSongId = parseInt(songId)
        getUserSongsBySongId(currentSongId)
        .then(response => {
            console.log("getUserSongsBySongId", response)
           return setCollabRequest(response)
        })
    }

    const handleCollabDeny = (userSongId) => {
        denyUserSong(userSongId)
        .then(() => checkForCollab())
    }

    useEffect(() => {
        getMySong()
    }, [])

    useEffect(() => {
        checkForCollab()
    }, [])

    return (
        <section className="mySongCard">
            {collabRequest.length > 0 ?
            collabRequest.map(request =>
                <CollabRequestCard key={request.id}
                                   collabRequest={request}
                                   handleCollabDeny={handleCollabDeny} />) : null}
                 
            <h2>{mySong.title}</h2>
            <pre>{mySong.lyrics}</pre>
        </section>
    )
}
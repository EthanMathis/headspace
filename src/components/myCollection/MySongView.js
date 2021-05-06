import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getSongById } from '../../modules/songManager';
import { denyUserSong, acceptUserSong ,getUserSongsBySongId } from "../../modules/userSongManager";
import { MessageList } from "../messages/MessageList";
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
           return setCollabRequest(response)
        })
    }

    const handleCollabDeny = (userSongId) => {
        denyUserSong(userSongId)
        .then(() => checkForCollab())
    }

    const handleCollabApprove = (collabRequest) => {
        const newUserSong = {
            id: collabRequest.id,
            songId: collabRequest.songId,
            userId: collabRequest.userId,
            canEdit: true
        }
        acceptUserSong(newUserSong)
        .then(() => checkForCollab())
    }

    useEffect(() => {
        getMySong()
    }, [])

    useEffect(() => {
        checkForCollab()
    }, [])

    return (
        <div className="d-flex flex-row justify-content-around">
            <div className="col-sm border border-info rounded float-left m-2 p-2">
                <h2 className="text-center">{mySong.title}</h2>
                <pre>{mySong.lyrics}</pre>
            </div>     
        <div className="mx-auto">
            {collabRequest.length > 0 ?
            collabRequest.map(request =>
                <CollabRequestCard key={request.id}
                                   collabRequest={request}
                                   handleCollabDeny={handleCollabDeny}
                                   handleCollabApprove={handleCollabApprove} />) : null}
        </div>
        <div className="border border-info rounded float-right m-2 p-2">
            <h2 className="text-center">Message Board</h2>
                <MessageList />
        </div>
        </div>
    )
}
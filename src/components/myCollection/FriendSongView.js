import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";
import { MusicPlayer } from "../../firebase/MusicPlayer";
import { getSongById } from '../../modules/songManager';
import { addUserSong, getUserSongsBySongId } from "../../modules/userSongManager";
import { MessageList } from "../messages/MessageList";


export const FriendSongView = () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const [friendSong, setFriendSong] = useState({})
    const [isPending, setIsPending] = useState(false)
    const [canEdit, setCanEdit] = useState({})

    const { songId } = useParams()
    const history = useHistory()

    
    const canYouEdit = () => {
        return getUserSongsBySongId(songId)
        .then(response => {
            let activeUserRequest = response.find(request => request.userId === loggedInUser)
            setCanEdit(activeUserRequest)
            activeUserRequest == undefined ? setIsPending(false) : setIsPending(true)
            })
    } 


    const getFriendSong = () => {
        getSongById(songId)
        .then(response => {
           return setFriendSong(response)
        })
    }

    const handleRequest = () => {
        setIsPending(true)
        const songIdInt = parseInt(songId) 
        const newUserSong = {
            songId: songIdInt,
            userId: loggedInUser,
            canEdit: false
        }
        addUserSong(newUserSong)
    }

    useEffect(() => {
        getFriendSong()
    }, [])

    useEffect(() => {
        canYouEdit()
    }, [])

    return (
        <div>

            <div className="d-flex flex-row justify-content-between m-1 p-1">
                <button type="button" className="btn btn-info" onClick={() => history.push("/")}>Back</button>
                <button type="button" className="btn btn-outline-info" disabled={isPending} onClick={handleRequest}>Request Collaboration</button>
            </div>

            <div className="d-flex justify-content-around">
                <div className="d-flex">
                    <div  className="border border-info rounded m-2 p-2">
                        <h2 className="text-center">{friendSong.title}</h2>
                        <h4 className="text-center">Written By: {friendSong.user?.name}</h4>
                        <pre>{friendSong.lyrics}</pre>
                    </div>
                    {canEdit?.canEdit &&
                        <div>
                            <button type="button" className="btn btn-primary mt-2" onClick={() => history.push(`/song/${songId}/edit`)}>Edit</button>
                        </div>}
                </div>
                {canEdit?.canEdit && 
                <div>
                    <MusicPlayer songId={songId} />
                <section className="messageBoard">
                <h2 className="text-center">Message Board</h2>
                    <MessageList />
                </section>
                </div>}
            </div>
        </div>
    )
}
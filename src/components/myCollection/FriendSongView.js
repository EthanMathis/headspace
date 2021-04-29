import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getSongById } from '../../modules/songManager';
import { addUserSong, getUserSongsBySongId } from "../../modules/userSongManager";


export const FriendSongView = () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const [friendSong, setFriendSong] = useState({})
    const { songId } = useParams()
    const [isPending, setIsPending] = useState(false)
    const [canEdit, setCanEdit] = useState({})

    const canYouEdit = () => {
        return getUserSongsBySongId(songId)
        .then(response => {
            setCanEdit(response.find(request => request.userId === loggedInUser))
        })
        .then(() => {
            if(canEdit == undefined) {
                setIsPending(false)
            } else {
                // console.log(canEdit)
                setIsPending(true)
            }
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
        <section className="friendSongCard">
            <button type="button" className="btn btn-outline-info" disabled={isPending} onClick={handleRequest}>Request Collaboration</button>
            <h2>{friendSong.title}</h2>
            {/* <h4>Written By: {friendSong.user.name}</h4> */}
            <pre>{friendSong.lyrics}</pre>
        </section>
    )
}
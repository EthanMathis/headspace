import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getSongById } from '../../modules/songManager';


export const FriendSongView = () => {
    const [friendSong, setFriendSong] = useState({})
    const { songId } = useParams()

    const getFriendSong = () => {
        getSongById(songId)
        .then(response => {
            console.log(response)
           return setFriendSong(response)
        })
    }

    useEffect(() => {
        getFriendSong()
    }, [])

    return (
        <section className="friendSongCard">
            <h2>{friendSong.title}</h2>
            {/* <h4>Written By: {friendSong.user.name}</h4> */}
            <pre>{friendSong.lyrics}</pre>
        </section>
    )
}
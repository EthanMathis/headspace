import React, { useEffect, useState } from "react"
import { FriendSongCard } from "./FriendSong"
import { Link, useParams } from "react-router-dom"
import { getUserSongs } from "../../modules/songManager"

export const FriendCollection = () => {
    const [songs, setSongs] = useState([])
    const { friendId } = useParams()

    const getSongs = () => {
        getUserSongs(friendId)
        .then(response => setSongs(response))
    }

    useEffect(() => {
        getSongs()
    }, [])

    return (
        <section className="d-flex flex-column">
            <div className="songCard">
                {songs.map(song => 
                    <FriendSongCard key={song.id}
                                    song={song} /> )}
            </div>
        </section>
    )
}
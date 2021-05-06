import React, { useEffect, useState } from "react"
import { FriendSongCard } from "./FriendSong"
// import { Link, useParams } from "react-router-dom"
import { getUserSongs } from "../../modules/songManager"

export const FriendCollection = ({ friendId, setFriendId }) => {
    const [songs, setSongs] = useState([])
    // const { friendId } = useParams()

    const getSongs = () => {
        getUserSongs(friendId)
        .then(response => setSongs(response))
    }

    useEffect(() => {
        getSongs()
    }, [])

    return (
        <section>
            <button type="button" className="btn btn-info" onClick={() => setFriendId(0)}>Back</button>
            <div className="songCard">
                {songs.map(song => 
                    <FriendSongCard key={song.id}
                                    song={song} /> )}
            </div>
        </section>
    )
}
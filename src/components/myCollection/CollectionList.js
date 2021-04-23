import React, { useEffect, useState } from "react"
import { SongCard } from "./SongCard"
import { Link } from "react-router-dom"
import { getUserSongs } from "../../modules/songManager"


export const MyCollection = () => {

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

   const [songs, setSongs] = useState([])

    const getSongs = () => {
        getUserSongs(loggedInUser)
        .then(response => setSongs(response))
    }

    useEffect(() => {
        getSongs()
    }, [])
    
   return (
   <section className="songList">
        <div className="SongCards">
            {songs.map(song =>
                <SongCard key={song.id}
                          song={song} /> )}
        </div>
        <Link to={`/song/createSong`}>
            <button type="button" className="btn btn-success">Create New Song</button>
        </Link>
    </section>
   )
}

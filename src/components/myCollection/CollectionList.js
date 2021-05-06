import React, { useEffect, useState } from "react"
import { SongCard } from "./SongCard"
import { Link } from "react-router-dom"
import { deleteSong, getUserSongs } from "../../modules/songManager"
import { FriendsList } from "../friends/FriendsList"


export const MyCollection = () => {

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

   const [songs, setSongs] = useState([])


    const getSongs = () => {
        getUserSongs(loggedInUser)
        .then(response => setSongs(response))
    }

    const handleDelete = (songId) => {
        deleteSong(songId)
        .then(response => getSongs())
    }

    useEffect(() => {
        getSongs()
    }, [])
    
   return (
        <div className="d-flex justify-content-around container-lg">
            <section className="d-flex flex-column col-md-8">
                <div className="d-flex mx-auto m-2 p-1">
                        <Link to={`/song/createSong`}>
                            <button type="button" className="btn btn-success">Create New Song</button>
                        </Link>
                </div>
                    <div className="d-flex flex-column mx-auto text-center">
                        <h2 className="font-weight-bold">My Collection</h2>
                        {songs.map(song =>
                            <SongCard key={song.id}
                                    song={song}
                                    handleDelete={handleDelete} /> )}
                    </div>
            </section>
            <section className="col-md-8">
                <FriendsList />
            </section>
        </div>
   )
}

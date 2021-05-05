import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { getSongById, updateSong } from '../../modules/songManager';
import "./newSong.css"; 


export const SongEditForm = () => {

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const [editSong, setEditSong] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const {songId} = useParams()
    const history = useHistory()

    const getMySong = () => {
        getSongById(songId)
        .then(song => {
            setEditSong(song)
            setIsLoading(false)
        })
    }

    const handleInputChange = (event) => {
        const newSong = { ...editSong }
        let selectedVal = event.target.value
        newSong[event.target.id] = selectedVal
        setEditSong(newSong)
    }

    const handleSaveEdit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        const editedSong = {
            id: editSong.id,
            userId: loggedInUser,
            title: editSong.title,
            lyrics: editSong.lyrics
        }
        updateSong(editedSong)
        .then(() => history.push("/"))
    }

    useEffect(() => {
        getMySong()
    }, [])

    return (
        <div className="d-flex">

            <textarea id="lyrics" 
                      cols="75" 
                      rows="25" 
                      value={editSong.lyrics} 
                      onChange={handleInputChange}>
            </textarea>
            <div className="d-flex flex-column align-self-center mx-auto w-25">
                <button type="button" 
                        className="btn btn-outline-success p-2 m-2" 
                        disabled={isLoading} 
                        onClick={handleSaveEdit}>Save It</button>
                <button type="button" className="btn btn-outline-danger p-2 m-2" onClick={() => history.push("/")}>Scrap It</button>
            </div>
        </div>
    )
}
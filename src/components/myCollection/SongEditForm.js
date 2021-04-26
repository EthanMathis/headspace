import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { getSongById, updateSong } from '../../modules/songManager';

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
            lyrics: editSong.lyrics,
            isPublic: false
        }
        updateSong(editedSong)
        .then(() => history.push("/"))
    }

    useEffect(() => {
        getMySong()
    }, [])

    return (
        <div className="songEditForm">

            <textarea id="lyrics" 
                      cols="60" 
                      rows="25" 
                      value={editSong.lyrics} 
                      onChange={handleInputChange}>
            </textarea>
            <button type="button" 
                    className="btn btn-outline-success" 
                    disabled={isLoading} 
                    onClick={handleSaveEdit}>Save It</button>
        </div>
    )
}
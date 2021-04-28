import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { getSongById, updateSong } from '../../modules/songManager';
import "./newSong.css"; 

export const FriendSongEditForm = () => {
    
    // const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const [editFriendSong, setEditFriendSong] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const { songId } = useParams()
    const history = useHistory()

    const getMySong = () => {
        getSongById(songId)
        .then(song => {
            setEditFriendSong(song)
            setIsLoading(false)
        })
    }

    const handleInputChange = (event) => {
        const newSong = { ...editFriendSong }
        let selectedVal = event.target.value
        newSong[event.target.id] = selectedVal
        setEditFriendSong(newSong)
    }

    const handleSaveEdit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        const editedSong = {
            id: editFriendSong.id,
            userId: editFriendSong.userId,
            title: editFriendSong.title,
            lyrics: editFriendSong.lyrics
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
                      cols="75" 
                      rows="25" 
                      value={editFriendSong.lyrics} 
                      onChange={handleInputChange}>
            </textarea>
            <button type="button" 
                    className="btn btn-outline-success" 
                    disabled={isLoading} 
                    onClick={handleSaveEdit}>Save It</button>
        </div>
    )
}
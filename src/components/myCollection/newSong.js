import React, { useState } from "react"
import { useHistory } from "react-router"
import { addSong } from "../../modules/songManager"
import "./newSong.css" 

export const NewSongInput = () => {

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()
    const [newSong, setNewSong] = useState({
        userId: loggedInUser,
        title: "",
        lyrics: ""
    })

    const handleInputChange = (event) => {
        const newSongCopy = {...newSong}
        let selectedVal = event.target.value
        newSongCopy[event.target.id] = selectedVal
        setNewSong(newSongCopy)
    }

    

    const handleAddSong = (event) => {
        event.preventDefault()
        setIsLoading(true)
        addSong(newSong).then(() => {
            setIsLoading(false)
            history.push("/")
        })
    }
    return (
        <div className="newSong">
            <label htmlFor="title">Title</label>
            <input type="text"
                   id="title"
                   className="title"
                   value={newSong.title}
                   onChange={handleInputChange} />
            <textarea id="lyrics" cols="75" rows="25" value={newSong.lyrics} onChange={handleInputChange}>

            </textarea>
            <button type="button" className="btn btn-outline-danger" onClick={() => history.push("/")}>Scrap It</button>
            <button type="button" className="btn btn-outline-success" disabled={isLoading} onClick={handleAddSong}>Save It</button>
        </div>
    )
}
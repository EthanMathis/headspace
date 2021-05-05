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
        <div className="d-flex">
            <div className="d-flex flex-column">
                <label htmlFor="title" className="text-center">Title
                <input type="text"
                    id="title"
                    className="w-50"
                    value={newSong.title}
                    onChange={handleInputChange} /></label>
                <textarea id="lyrics" cols="75" rows="25" value={newSong.lyrics} onChange={handleInputChange}>

                </textarea>
            </div>
            <div className="d-flex flex-column align-self-center mx-auto w-25">
                <button type="button" className="btn btn-outline-danger p-2 m-2" onClick={() => history.push("/")}>Scrap It</button>
                <button type="button" className="btn btn-outline-success p-2 m-2" disabled={isLoading} onClick={handleAddSong}>Save It</button>
            </div>
        </div>
    )
}
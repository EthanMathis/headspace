import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getSongById } from '../../modules/songManager';

export const MySongView = () => {
    const [mySong, setMySong] = useState({})
    const { songId } = useParams()

    const getMySong = () => {
        getSongById(songId)
        .then(response => {
            return setMySong(response)
        })
    }

    useEffect(() => {
        getMySong()
    }, [])

    return (
        <section className="mySongCard">
            <h2>{mySong.title}</h2>
            <pre>{mySong.lyrics}</pre>
        </section>
    )
}
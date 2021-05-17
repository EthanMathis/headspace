import React, { useEffect, useState } from "react"
import { getUploadById, getUploadsBySongId } from "../modules/uploadManager"
import ProgressBar from './ProgressBar'

export const UploadFile = ({ songId }) => {
    const [file, setFile] = useState(null)
    const [uploads, setUploads] = useState([])
    const [selectedUpload, setSelectedUpload] = useState({})

    const getUploads = () => {
        return getUploadsBySongId(songId)
        .then(response => {
            // console.log(response)
            return setUploads(response)
        })
    } 

    const handleUpload = (e) => {
        const selected = e.target.files[0]
        if(selected) {
            setFile(selected)
        }}

    const handleSelectedUpload = (e) => {
        let selected = e.target.value
        getUploadById(selected)
        .then(response => {
            // console.log(response[0])
            return setSelectedUpload(response[0])
        })
    }

        useEffect(() => {
            getUploads()
        }, [])

    return (
        <>
            <div className="border border-info rounded m-2 p-2 mx-auto text-center w-75 mt-5">
                <form>
                    <label>
                        <h4>Upload a Sound File</h4>
                        <p> supported file types are .mp3 and .wav </p>
                        <input type="file" accept="audio/*" onChange={handleUpload} />
                    </label>
                    <div className="output">
                        { file && <div>{ file.name }</div> }
                        { file && <ProgressBar file={file} setFile={setFile} /> }
                    </div>
                </form>
            </div>
                <div className="border border-info rounded m-2 p-2 mx-auto text-center w-75">
                    <p>select one of your songs from the dropdown to load it into the music player</p>
                    <select className="m-2 p-1" name="uploadId" id="uploadId" onChange={handleSelectedUpload}>
                        <option value="0">Select An Upload</option>
                        {uploads.map(upload => (
                            <option key={upload.id} value={upload.id}>
                                {upload.name}
                            </option>
                        ))}
                    </select>
                    <audio src={selectedUpload?.url} controls />
                </div>
        </>
    )
}

export default UploadFile;
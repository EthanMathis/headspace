import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { postUpload } from "../modules/uploadManager"
import { projectStorage, projectFirestore, timestamp } from "./firebase"

const useStorage = (file) => {
    const [progress, setProgress] = useState(0)
    const [url, setUrl] = useState(null)
    const [error, setError] = useState(null)
    const { songId } = useParams()

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))
    let songIdInt = parseInt(songId)

    useEffect(() => {
        // references
        const storageRef = projectStorage.ref(file.name)
        const collectionRef = projectFirestore.collection('uploads');

        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
            setProgress(percentage)
        }, (err) => {
            setError(err)
        }, async () => {
            const url = await storageRef.getDownloadURL()
            const createdAt = timestamp();
            await collectionRef.add({ url, createdAt })
            setUrl(url)
            const newUpload = {
                songId: songIdInt,
                userId: loggedInUser,
                url: url,
                name: file.name
            }
            postUpload(newUpload)
        })
    }, [file])

    return { progress, url, error }
}

export default useStorage;
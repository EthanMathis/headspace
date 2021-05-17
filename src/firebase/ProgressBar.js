import React, { useEffect } from 'react';
import useStorage from './UseStorage'

const ProgressBar = ({ file, setFile }) => {
    const { progress, url } = useStorage(file)
    // console.log(progress)

   

    useEffect(() => {
        if(url) {
            setFile(null)
        }
    }, [url, setFile])

    return (
        <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" 
                 role="progressbar"
                 aria-valuenow={progress + '%'} 
                 aria-valuemax="100"
                 aria-valuemin="0"
                 style={{ width: progress + '%' }}></div>
        </div>
    )
}

export default ProgressBar
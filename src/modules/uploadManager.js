const url = "http://localhost:8088"

export const postUpload = (uploadObj) => {
    return fetch(`${url}/uploads`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(uploadObj)
    })
    .then(response => response.json())
}

export const getUploadsBySongId = (songId) => {
    return fetch(`${url}/uploads?songId=${songId}`)
    .then(response => response.json())
}

export const getUploadById = (uploadId) => {
    return fetch(`${url}/uploads?id=${uploadId}`)
    .then(response => response.json())
}
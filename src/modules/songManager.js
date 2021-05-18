const url = "http://localhost:8088"

export const addSong = (songObj) => {
    return fetch(`${url}/songs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(songObj)
    })
    .then(response => response.json())
}

export const getUserSongs = (userId) => {
    return fetch(`${url}/songs?userId=${userId}&_expand=user`)
    .then(response => response.json())
}

export const getSongById = (songId) => {
    return fetch(`${url}/songs/${songId}?_expand=user`)
    .then(response => response.json())
}

export const updateSong = (songObj) => {
    return fetch(`${url}/songs/${songObj.id}?_expand=user`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(songObj)
    })
    .then(response => response.json())
}

export const deleteSong = (songId) => {
    return fetch(`${url}/songs/${songId}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}
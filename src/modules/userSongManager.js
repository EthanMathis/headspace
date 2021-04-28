const url = "http://localhost:8088"

export const addUserSong = (userSongObj) => {
    return fetch(`${url}/userSongs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userSongObj)
    })
    .then(response => response.json())
}

export const getUserSongsBySongId = (songId) => {
    return fetch(`${url}/userSongs?songId=${songId}&_expand=user`)
    .then(response => response.json())
}

export const denyUserSong = (userSongId) => {
    return fetch(`${url}/userSongs/${userSongId}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}

export const acceptUserSong = (userSongObj) => {
    return fetch(`${url}/userSongs/${userSongObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userSongObj)
    }).then(response => response.json())
}
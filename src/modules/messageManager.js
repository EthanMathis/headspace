const url = "http://localhost:8088"

export const getMessagesBySongId = (songId) => {
    return fetch(`${url}/messages?songId=${songId}&_expand=user`)
    .then(response => response.json())
}

export const addMessage = (msgObj) => {
    return fetch(`${url}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(msgObj)
    })
    .then(response => response.json())
}

export const getMessageById = (msgId) => {
    return fetch(`${url}/message?id=${msgId}`)
    .then(response => response.json())
}

export const deleteMessage = (msgId) => {
    return fetch(`${url}/messages/${msgId}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}

export const updateMessage = (msgObj) => {
    return fetch(`${url}/messages/${msgObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({message: msgObj.message})
    })
    .then(response => response.json())
}
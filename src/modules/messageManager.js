const url = "http://localhost:8088"

export const getMessagesByFriendId = (friendId) => {
    return fetch(`${url}/messages?friendId=${friendId}&_expand=user`)
    .then(response => response.json())
}

export const getMessageById = (messageId) => {
    return fetch(`${url}/messages/${messageId}`)
    .then(response => response.json())
}

export const deleteMessage = (messageId) => {
    return fetch(`${url}/messages/${messageId}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}

export const addMessage = (newMessage) => {
    return fetch(`${url}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMessage)
    })
    .then(response => response.json())
}

export const updateMessage = (msgObj) => {
    return fetch(`${url}/messages/${msgObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(msgObj)
    }).then(response => response.json())
}
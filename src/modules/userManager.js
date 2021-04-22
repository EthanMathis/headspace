const url = "http://localhost:8088"

export const getAllUsers = () => {
    return fetch(`${url}/users`)
    .then(response => response.json())
}
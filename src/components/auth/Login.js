import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import "./Login.css"


export const Login = () => {
    const [loginUser, setLoginUser] = useState({ email: "" })
    const [existDialog, setExistDialog] = useState(false)

    const history = useHistory()

    const handleInputChange = (event) => {
        const newUser = { ...loginUser }
        newUser[event.target.id] = event.target.value
        setLoginUser(newUser)
    }


    const existingUserCheck = () => {
        // If your json-server URL is different, please change it below!
        return fetch(`http://localhost:8088/users?email=${loginUser.email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    // The user id is saved under the key headspace_user in session Storage. Change below if needed!
                    sessionStorage.setItem("headspace_user", exists.id)
                    history.push("/")
                } else {
                    setExistDialog(true)
                }
            })
    }

    return (
        <main className="container--login d-flex flex-column align-items-center">
            <dialog className="dialog dialog--auth" open={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => setExistDialog(false)}>Close</button>
            </dialog>
            <section className="formContainer border border-info rounded w-50 text-center mx-auto m-2 p-2">
                <form className="form--login" onSubmit={handleLogin}>
                    <h2>Welcome to Headspace</h2>
                    <h2>- A Songwriting Tool For Musicians -</h2>
                    <h2>Sign Up or Log In To Get Started</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            id="email"
                            className="form-control mx-auto"
                            placeholder="Email address"
                            required autoFocus
                            value={loginUser.email}
                            onChange={handleInputChange} />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="btn btn-success">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register text-center">
                <Link to="/register">Register for an account</Link>
            </section>
        </main>
    )
}

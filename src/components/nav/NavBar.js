import React from "react"
import { Link, useHistory } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

export const NavBar = (props) => {
    const history = useHistory();

    const handleLogout = () => {
        sessionStorage.clear();
        history.push("/login")
    }
    return (
        <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">

            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" to="/">My Collection</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/friends">Friends</Link>
                </li>
            </ul>

            <ul className="list-unstyled">
                <li className="nav-item">
                    <button type="button" className="btn btn-outline-danger navbar-right" onClick={handleLogout}> Logout </button>
                </li>
            </ul>
        </nav>
    )
}
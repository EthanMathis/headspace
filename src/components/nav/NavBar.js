import React from "react"
import { Link, useHistory } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"
import logo from "../../images/HeadspaceNameBlueCropped.png"

export const NavBar = (props) => {
    const history = useHistory();

    const handleLogout = () => {
        sessionStorage.clear();
        history.push("/login")
    }
    return (
        <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">

            <ul className="nav nav-pills nav-fill">
                <li className="m-2 p-2">
                </li>
                <li className="nav-item m-2">
                    <Link className="nav-link" to="/"><img src={logo} alt="" /></Link>
                </li>
            </ul>

            <ul className="list-unstyled m-2">
                <li className="nav-item">
                    <button type="button" className="btn btn-outline-danger navbar-right" onClick={handleLogout}> Logout </button>
                </li>
            </ul>
        </nav>
    )
}
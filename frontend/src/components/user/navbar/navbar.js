import React from "react"
import { Link } from "react-router-dom"
import "./navbar.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { checkLoginStatus } from "../../../slices/user-slice"

export default function NavBar() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkLoginStatus())
        console.log("Navbar changed: ", isLogged)
    })
    const isLogged = useSelector(state => state.userReducer.isLogged)
    return (
        <div>
            <nav>
                <ul>
                    {!isLogged && <li id="logo"><Link to="/">Project AA</Link></li>}
                    {isLogged && <li id="logo"><Link to="/home">Project AA</Link></li>}
                    {isLogged && <li><Link to="/home">Home</Link></li>}
                    {!isLogged && <li><Link to="/login">Login</Link></li>}
                    {isLogged && <li><Link to="/profile">Profile</Link></li>}
                    {isLogged && <li><Link to="/logout" >logout</Link></li>}
                    {!isLogged && <li><Link to="/register">Register</Link></li>}
                </ul>
            </nav>
        </div>
    )
}
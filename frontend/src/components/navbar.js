import React from "react"
import { Link } from "react-router-dom"
import "./navbar.css"
import { useSelector, useDispatch } from "react-redux"
import { userSlice } from "../slices/user-slice"

export default function NavBar() {
    const isLogged = useSelector(state => state.userReducer.value.isLogged)
    const dispatch = useDispatch()
    return (
        <div>
            <nav>
                <ul>
                    {!isLogged && <li id="logo"><Link to="/">Project AA</Link></li>}
                    {isLogged && <li id="logo"><Link to="/home">Project AA</Link></li>}
                    {isLogged && <li><Link to="/home">Home</Link></li>}
                    {!isLogged && <li><Link to="/login">Login</Link></li>}
                    {isLogged && <li><Link to="/profile">Profile</Link></li>}
                    {isLogged && <li><Link to="/" onClick={() => { dispatch(userSlice.actions.logoutRed()) }}>logout</Link></li>}
                    {!isLogged && <li><Link to="/register">Register</Link></li>}
                    {/* {!isLogged && <li><Link to="/teach">Join as teacher</Link></li>} */}
                </ul>
            </nav>
        </div>
    )
}
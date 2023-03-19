import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import "./navbar.css"

export default function NavBar() {
    return (
            <div>
                <nav>
                    <ul>
                        <li id="logo"><Link to="/">AQRA</Link></li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/teach">Join as teacher</Link></li>
                    </ul>
                </nav>
            </div>
    )
}
import React from "react"
import "./Landing.css"
import { useEffect } from "react"
import NavBar from "../../user/navbar/navbar"

export default function Landing() {
    useEffect(() => {
        console.log("Landing mounted")
    })
    return (
        <div className="container">
        <NavBar/>
            <h1>Landing</h1>
        </div>
    )
}
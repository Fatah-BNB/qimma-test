import React from "react"
import "./home.css"
import { useEffect } from "react"
import NavBar from "./navbar"

export default function Home() {
    useEffect(() => {
        console.log("Home mounted")
    })
    return (
        <div className="container">
            <NavBar />
            <h1>HOME</h1>
        </div>
    )
}
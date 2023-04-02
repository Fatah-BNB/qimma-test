import React from "react"
import "./home.css"
import { useEffect } from "react"

export default function Home() {
    useEffect(() => {
        console.log("Home mounted")
    })
    return (
        <div className="container">
            <h1>HOME</h1>
        </div>
    )
}
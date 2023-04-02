import React from "react"
import "./Landing.css"
import { useEffect } from "react"

export default function Landing() {
    useEffect(() => {
        console.log("Landing mounted")
    })
    return (
        <div className="container">
            <h1>Landing</h1>
        </div>
    )
}
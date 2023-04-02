import React from "react"
import { useEffect } from "react"

export default function ErrorPage() {
    useEffect(() => {
        console.log("Error mounted")
    })
    return(
        <div style={{fontSize: "50px", textAlign: "center"}}>
            Page not available
        </div>
    )
}
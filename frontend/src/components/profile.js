import React from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import NavBar from "./navbar";

export default function Profile() {
    useEffect(() => {
        console.log("Profile mounted")
    })
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/password-reset")
    };
    return (
        <div>
        <NavBar/>
            <h1>PROFILE</h1>
            <button type="button" onClick={handleClick}>
                Reset password
            </button>
        </div>
    )
}
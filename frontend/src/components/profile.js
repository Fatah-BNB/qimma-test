import React from "react"
import { useNavigate } from "react-router-dom"

export default function Profile() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/password-reset")
      };
    return (
        <div>
            <h1>PROFILE</h1>
            <button type="button" onClick={handleClick}>
            Reset password
            </button>
        </div>
    )
}
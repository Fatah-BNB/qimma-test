import React, {useState} from "react"
import { useLocation } from 'react-router-dom';

export default function Profile() {
    const location = useLocation()
    const [username, setUsername] = useState("");
    const [userType, setUserType] = useState("");
    return(
        <div>
            <h1>Welcome back {location.state && location.state.username}</h1>
            <h2>user type {location.state && location.state.userType}</h2>
        </div>
    )
}
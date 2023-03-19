import React, {useState} from "react"

export default function Profile() {
    const [username, setUsername] = useState("");
    const [userType, setUserType] = useState("");
    return(
        <div>
            <h1>Welcome back {username}</h1>
            <h2>user type {userType}</h2>
        </div>
    )
}
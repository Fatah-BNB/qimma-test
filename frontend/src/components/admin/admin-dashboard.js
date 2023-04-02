import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function AdminDashboard() {
    useEffect(() => {
        console.log("Admin dashboard mounted")
    })
    const location = useLocation()
    return (
        <div>
            {/* {location.state.username && <h1>Welcom Admin<br/>{location.state.username}</h1>} */}
            <h1>ADMIN DASHBOARD</h1>
        </div>
    )
}

import React from 'react'
import { useLocation } from 'react-router-dom'

export default function AdminDashboard() {
    const location = useLocation()
    return (
        <div>
            {location.state.username && <h1>Welcom Admin<br/>{location.state.username}</h1>}
        </div>
    )
}

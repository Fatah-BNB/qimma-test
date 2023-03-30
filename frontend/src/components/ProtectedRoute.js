import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ isLogged, child, redirect }) {
    if (isLogged === false) {
        return <Navigate to= {redirect} />
    }
    return child
}

import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ isLogged, child }) {
    if (isLogged === false) {
        return <Navigate to="/login" />
    }
    return child
}

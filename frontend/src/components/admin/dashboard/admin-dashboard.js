import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Axios from "axios"
import { useDispatch } from 'react-redux'
import { checkAdminLoginStatus } from '../../../slices/admin-slice'

export default function AdminDashboard() {
    useEffect(() => {
        dispatch(checkAdminLoginStatus())
        getUsersCount()
        console.log("Admin dashboard mounted")
    })
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [count, setCount] = useState(0)

    const getUsersCount = () => {
        Axios.get("http://localhost:5000/admin/admin-count").then(response => {
            setCount(response.data.nbrUsers)
        }).catch(error => {
            console.log(error.response.data.error)
        })
    }

    const logout = () => {
        Axios.post('http://localhost:5000/admin/logout', null, {
            withCredentials: true
        })
            .then(async response => {
                if (response.status === 200) {
                    console.log(response.data.succMsg)
                    await dispatch(checkAdminLoginStatus())
                    navigate("/login-admin")
                }
            })
            .catch(error => console.log(error));
    }
    return (
        <div>
            <button onClick={()=>{logout(); dispatch(checkAdminLoginStatus)}}>Logout</button>
            {/* {location.state.username && <h1>Welcom Admin<br/>{location.state.username}</h1>} */}
            <h1>ADMIN DASHBOARD</h1>
            <h2>Number of users: {count}</h2>
        </div>
    )
}

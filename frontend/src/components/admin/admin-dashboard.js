import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Axios from "axios"
import { useDispatch } from 'react-redux'
import { checkAdminLoginStatus } from '../../slices/admin-slice'

export default function AdminDashboard() {
    useEffect(() => {
        dispatch(checkAdminLoginStatus())
        console.log("Admin dashboard mounted")
    })
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
        </div>
    )
}

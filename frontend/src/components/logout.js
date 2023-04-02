import React, { useState, useEffect } from "react"
import "./logout.css"
import Axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { checkLoginStatus } from "../slices/user-slice"

export default function Logout() {
    useEffect(() => {
        console.log("Logout mounted")
    })
    const dispatch = useDispatch()
    useEffect(() => {
        logout()
        dispatch(checkLoginStatus())
        console.log("on Mount logout: ", isLogged)
    })
    const isLogged = useSelector(state => state.userReducer.isLogged)
    const [coockieMsg, setCookieMsg] = useState("")
    const logout = () => {
        Axios.post('http://localhost:5000/logout', null, {
            withCredentials: true
        })
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data.succMsg)
                    setCookieMsg(response.data.succMsg)
                    // dispatch(checkLoginStatus())
                    console.log("after cookie cleared: ", isLogged)
                }
            })
            .catch(error => console.log(error));
    }
    return (
        <div className="container">
            <p>{coockieMsg}</p>
            <h1>Thank you <br />You are logged out.</h1>
        </div>
    )
}
import React from "react"
import "./comfirmed.css"
import NavBar from "./navbar"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

export default function ComfirmEmail() {

    const navigate = useNavigate()
    const currentUrl = new URL(window.location.href);
    currentUrl.port = "5000";    
    Axios.get(currentUrl.toString()
    ).then(response => {
        document.getElementById("message").innerHTML = "Your account is verified<br/> You can login now.";
        // setTimeout(navigate("/login"),10000) I couldn't turn it on
    }).catch(error => {
        document.getElementById("message").innerHTML = "We couldn't verify you email<br/>"+error.response.data.errMsg;
    })



return (

    <div className="container">
        <NavBar/>
        <h1 id="message">We in the verification phase.<br/>Please wait...</h1>
    </div>
)
    
}
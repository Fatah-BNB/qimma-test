import React, { useState, useEffect } from "react"
import { useFormik } from "formik"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import "./login.css"
import { useDispatch, useSelector } from "react-redux"
import { checkLoginStatus, fetchUserData } from "../slices/user-slice"
import NavBar from "./navbar"

export default function LoginForm() {
  useEffect(() => {
    console.log("Login mounted")
  })
  const dispatch = useDispatch()
  // const isLogged = useSelector(state => state.userReducer.isLogged)
  const [loginMsg, setLoginMsg] = useState("")
  const resendEmail = () => {
    Axios.post("http://localhost:5000/login/resend-email-verification", {
      email: formik.values.email
    }).then(response => {
      setLoginMsg(response.data.succMsg)
    }).catch(error => {
      setLoginMsg(error.response.data.errMsg)
    })
  }
  const myState = useSelector(state => state.userReducer.email)
  const login = () => {
    Axios.post("http://localhost:5000/login", {
      email: formik.values.email,
      password: formik.values.password,
    }, {
      withCredentials: true // allow sending cookies
    }).then(async (response) => {
      console.log("DATA ---> ", response.data)
      await dispatch(checkLoginStatus())
      await dispatch(fetchUserData(response.data))
      console.log("STATE ----> ", myState)
      // console.log("IS LOGGED --> ", isLogged)
      navigate("/home")
    }).catch((error) => {
      setLoginMsg(error.response.data.errMsg)
    })
  }
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("this email address is not valid").required("required"),
      password: Yup.string().min(8, "password must be 8 characters long").required("required"),
    }),
    onSubmit: (values) => {
      console.log(values)
      //consume the login api
      login()
      formik.setFieldValue("password", "")
    }
  })
  return (
    <div>
    <NavBar/>
      <div className="login-form-container">
        <h2>Login</h2>
        <p>{loginMsg}</p>
        <form onSubmit={formik.handleSubmit}>
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <p className="error-message">{formik.errors.email}</p> : null}
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? <p className="error-message">{formik.errors.password}</p> : null}
          </div>
          {loginMsg === "confirm you email to log in" && <p className="option" onClick={resendEmail}>Resend verification email</p>}
          <p className="option">Forgot password</p>
          <button type="submit">Login</button>
          <p>Don't have an account yet? <span onClick={()=>{navigate("/register")}} className="option" style={{fontWeight: "bold"}}>Create account</span></p>
        </form>
      </div>
    </div>
  );
}
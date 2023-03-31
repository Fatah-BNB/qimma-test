import React, { useState } from "react"
import { useFormik } from "formik"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import "./login.css"
import { useDispatch } from "react-redux"
import { checkLoginStatus } from "../slices/user-slice"

export default function LoginForm() {
  const dispatch = useDispatch()
  const [loginMsg, setLoginMsg] = useState("")
  const login = () => {
    Axios.post("http://localhost:5000/login", {
      email: formik.values.email,
      password: formik.values.password,
    },{
      withCredentials: true // allow sending cookies
    }).then((response) => {
      navigate("/home")
      dispatch(checkLoginStatus())
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
    onSubmit: (values, { resetForm }) => {
      console.log(values)
      //consume the login api
      login()
      resetForm()
    }
  })
  return (
    <div>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
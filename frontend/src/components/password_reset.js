import React, { useState } from "react"
import { useFormik } from "formik"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import "./login.css"
import { loginRed } from "../slices/user-slice"
import { useDispatch } from "react-redux"

export default function ResetForm() {
    
  const [loginMsg, setLoginMsg] = useState("")
  const dispatch = useDispatch()
  const login = () => {
    Axios.post("http://localhost:5000/", {
      email: formik.values.email,
      password: formik.values.password,
    }).then((response) => {
      dispatch(loginRed({ isLogged: true }))
      navigate("/home", {
        state: {
          username: response.data.user_firstName,
          userType: response.data.userType
        }
      })
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

      resetForm()
    }
  })
  return (
    <div>
      <div className="login-form-container">
        <h2>Password reset</h2>
        <p>{loginMsg}</p>
        <form onSubmit={formik.handleSubmit}>
          <div class="form-group">
            <label for="email">New password</label>
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
            <label for="password">Comfirm password</label>
            <input
              name="cpassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? <p className="error-message">{formik.errors.password}</p> : null}
          </div>
          <button type="submit">Reset</button>
        </form>
      </div>
    </div>
  );
}
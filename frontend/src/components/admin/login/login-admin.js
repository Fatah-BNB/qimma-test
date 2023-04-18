import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import Axios from "axios"
import * as Yup from "yup"
import './login-admin.css'
import { useDispatch } from "react-redux"
import { checkAdminLoginStatus } from '../../../slices/admin-slice'
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLoginForm() {
  useEffect(() => {
    console.log("Admin login mounted")
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const login = () => {
    Axios.post("http://localhost:5000/admin/login", {
      email: formik.values.email,
      password: formik.values.password,
    }, { withCredentials: true }).then(async (response) => {
      await dispatch(checkAdminLoginStatus())
      navigate("/admin-dashboard", { state: { username: response.data.admin_username } })
    }).catch(error => { toast.error(error.response.data.errMsg) })
  }
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
      // navigate("/profile")
    }
  })
  return (
    <div className="login-form-container">
      <Toaster />
      <h2>Login</h2>
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
        <button type="submit">Login as admin</button>
      </form>
    </div>
  );
}
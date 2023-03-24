import React, {useState} from "react"
import {useFormik} from "formik"
import Axios from "axios"
import {useNavigate} from "react-router-dom"
import * as Yup from "yup"
import './login-admin.css'

export default function AdminLoginForm() {
  const [loginStatus, setLoginStatus] = useState("");
  const [loginErrStatus, setLoginErrStatus] = useState("");
  const login = () => {
    Axios.post("http://localhost:5000/admin/login", {
      email: formik.values.email,
      password: formik.values.password,
    }).then( (response) => {
      if(response.data.errMsg){
        setLoginErrStatus(response.data.errMsg)
      }else{
        setLoginStatus(response.data.admin_username)
      }
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
        onSubmit: (values, {resetForm}) => {
            console.log(values)
            //consume the login api
            login()
            resetForm()
            // navigate("/profile")
        }
    })
    return (
        <div className="login-form-container">
          <h2>Login</h2>
          {loginStatus !== "" ? <p>Welcome Admin : {loginStatus}</p> : <p>{loginErrStatus}</p>}
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
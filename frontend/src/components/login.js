import React, {useState} from "react"
import {useFormik} from "formik"
import Axios from "axios"
import {useNavigate} from "react-router-dom"
import * as Yup from "yup"
import "./login.css"

export default function LoginForm() {
  const [loginStatus, setLoginStatus] = useState("");
  const login = () => {
    Axios.post("http://localhost:5000/login", {
      email: formik.values.email,
      password: formik.values.password,
    }).then( (response) => {
      if(response.data.message){
        setLoginStatus(response.data.message)
      }else{
        setLoginStatus(response.data[0].user_firstName)
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
            password: Yup.string().min(4, "password must be 8 characters long").required("required"),
          }),
        onSubmit: (values) => {
            console.log(values)
            //consume the login api
            login()
            // navigate("/profile")
        }
    })
    return (
        <div className="login-form-container">
          <h2>Login</h2>
          <p>Username : {loginStatus}</p>
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
      );
}
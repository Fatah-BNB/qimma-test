import React, { useState } from "react"
import { useFormik } from "formik"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import "./login.css"

export default function ResetForm() {
    
  const [loginMsg, setLoginMsg] = useState("")
  const login = () => {
    Axios.post("http://localhost:5000/", {
      email: formik.values.email,
      password: formik.values.password,
    }).then((response) => {
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
      password: "",
      passwordc: ""
    },
    validationSchema: Yup.object({
      password: Yup.string().min(8, "password must be 8 characters long").matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          'Password must contain at least one uppercase character, one symbol, and one number').required("required"),
      passwordc: Yup.string().oneOf([Yup.ref("password"), null], "passwords must match").required("required"),
  }),
    onSubmit: (values) => {
      console.log(values)
      const url = window.location.href;
      const params = url.split("/").slice(-2);
      console.log(params.join("/"));
      Axios.post("http://localhost:5000/login/password-resetting/"+params.join("/"), {  
      password: formik.values.password,
      }).then(response => {
          navigate("/login")
      }).catch(error => {
          document.getElementById("message").innerHTML = error.response.data.errMsg;
      })
    }
  })
  return (
    <div>
      <div className="login-form-container">
        <h2>Password reset</h2>
        <p id="message">{loginMsg}</p>
        <form onSubmit={formik.handleSubmit}>
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
        <div class="form-group">
            <label for="passwordc">Confirm password</label>
            <input
                name="passwordc"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordc}
            />
            {formik.touched.passwordc && formik.errors.passwordc ? <p className="error-message">{formik.errors.passwordc}</p> : null}
        </div>
          <button type="submit">Reset</button>
        </form>
      </div>
    </div>
  );
}
import React, { useState } from "react"
import { useFormik, Field } from "formik"
import Axios from "axios"
import * as Yup from "yup"
import "./registration.css"

export default function RegistrationForm() {
    const [registerStatus, setRegisterStatus] = useState("")
    const register = () => {
        Axios.post("http://localhost:5000/register", {
            firstname: formik.values.firstname,
            email: formik.values.email,
            password: formik.values.password,
            userType: formik.values.userType,
        }).then((response) => {
            if (response.data.message) {
                setRegisterStatus(response.data.message)
            } else {
                setRegisterStatus("Account created")
            }
        })
    }
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            passwordc: "",
            birthdate: "",
            gender: "",
            phoneNumber: "",
            tier: "",
            field: "",
            userType: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("this email address is not valid").required("required"),
            password: Yup.string().min(8, "password must be 8 characters long").required("required"),
            passwordc: Yup.string().oneOf([Yup.ref("password"), null], "passwords must match").required("required"),
            firstname: Yup.string().required("required"),
            lastname: Yup.string().required("required"),
            birthdate: Yup.date().required("required"),
            gender: Yup.string().required("required"),
            phoneNumber: Yup.string().required("required"),
            // tier: Yup.string().required("required"),
            // field: Yup.string().when("userType", {is: "teacher", then: Yup.string().required("required")}),
            // field: Yup.string().required("required"),
            userType: Yup.string().required("required"),
        }),
        onSubmit: (values, {resetForm}) => {
            console.log(values)
            //consume the registration api
            register()
            resetForm()
        }
    })
    return (
        <div className="registration-form-container">
            <h2>Register new account</h2>
            <p>{registerStatus}</p>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="radio"
                            name="userType"
                            value="student" />
                        Register as student
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="radio"
                            name="userType"
                            value="parent" />
                        Register as parent
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="radio"
                            name="userType"
                            value="teacher" />
                        Register as teacher
                    </label>
                </div>
                {formik.touched.userType && formik.errors.userType ? <p className="error-message">{formik.errors.userType}</p> : null}
                <div class="form-group">
                    <label for="firstname">First name</label>
                    <input
                        name="firstname"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstname}
                    />
                    {formik.touched.firstname && formik.errors.firstname ? <p className="error-message">{formik.errors.firstname}</p> : null}
                </div>
                <div class="form-group">
                    <label for="lastname">Last name</label>
                    <input
                        name="lastname"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastname}
                    />
                    {formik.touched.lastname && formik.errors.lastname ? <p className="error-message">{formik.errors.lastname}</p> : null}
                </div>
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
                <div class="form-group">
                    <label for="birthdate">Birth date</label>
                    <input
                        name="birthdate"
                        type="date"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.birthdate}
                    />
                    {formik.touched.birthdate && formik.errors.birthdate ? <p className="error-message">{formik.errors.birthdate}</p> : null}
                </div>
                <div class="form-group">
                    <label for="gender">Gender</label>
                    <select
                        name="gender"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.gender}
                    >
                        <option disabled name="selectGender">-- select your gender --</option>
                        <option name="male" value="male">male</option>
                        <option name="female" value="female">female</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender ? <p className="error-message">{formik.errors.gender}</p> : null}
                </div>
                <div class="form-group">
                    <label for="phoneNumber">Phone number</label>
                    <input
                        name="phoneNumber"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? <p className="error-message">{formik.errors.phoneNumber}</p> : null}
                </div>
                {formik.values.userType === "student" && <div class="form-group">
                    <label for="tier">Tier</label>
                    <select
                        name="tier"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.tier}
                    >
                        <option disabled name="selectTier">-- select your tier --</option>
                        <option name="secondary" value="secondary school">Secondary school</option>
                        <option name="middle" value="middle school">Middle school</option>
                    </select>
                    {formik.touched.tier && formik.errors.tier ? <p className="error-message">{formik.errors.tier}</p> : null}
                </div>}
                {formik.values.userType === "teacher" && <div class="form-group">
                    <label for="field">Field</label>
                    <select
                        name="field"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.field}
                    >
                        <option disabled name="selectField">-- select your field --</option>
                        <option name="IT" value="IT and technology">IT and technology</option>
                        <option name="science" value="science">Science</option>
                    </select>
                    {formik.touched.field && formik.errors.field ? <p className="error-message">{formik.errors.field}</p> : null}
                </div>}
                <button type="submit">Create account</button>
            </form>
        </div>
    )
}
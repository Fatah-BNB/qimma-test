import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import Axios from "axios"
import * as Yup from "yup"
import "./registration.css"
import NavBar from "./navbar"

export default function RegistrationForm() {
    const [tiers, setTiers] = useState([])
    const [fields, setFields] = useState([])
    const getTiers = () => {
        Axios.get("http://localhost:5000/register/tiers").then(response => {
            setTiers(response.data.tiers)
        }).catch(error => {
            console.log("ERR fetching tiers --> ", error.response.data.errMsg)
        })
    }
    const getFields = () => {
        Axios.get("http://localhost:5000/register/fields").then(response => {
            setFields(response.data.fields)
        }).catch(error => {
            console.log("ERR fetching fields --> ", error.response.data.errMsg)
        })
    }
    useEffect(() => {
        console.log("Registration mounted")
        getTiers()
        getFields()
    }, [])
    const [registerMsg, setRegisterMsg] = useState("")
    const navigate = useNavigate()
    const register = () => {
        Axios.post("http://localhost:5000/register", {
            firstname: formik.values.firstname,
            lastname: formik.values.lastname,
            gender: formik.values.gender,
            birthdate: formik.values.birthdate,
            phonenumber: formik.values.phoneNumber,
            email: formik.values.email,
            password: formik.values.password,
            userType: formik.values.userType,
            tier: formik.values.tier,
            field: formik.values.field,
        }).then((response) => {
            setRegisterMsg(response.data.succMsg)
            navigate("/verify-email", {
                state: {
                    emailAdr: response.data.results.user_email,
                }
            })
        }).catch((error) => {
            setRegisterMsg(error.response.data.errMsg)
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
            email: Yup.string().email("invalid email address").required("required"),
            password: Yup.string().min(8, "password must be 8 characters long").matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                'Password must contain at least one uppercase character, one symbol, and one number').required("required"),
            passwordc: Yup.string().oneOf([Yup.ref("password"), null], "passwords must match").required("required"),
            firstname: Yup.string().required("required"),
            lastname: Yup.string().required("required"),
            birthdate: Yup.date().required("required"),
            gender: Yup.string().required("required"),
            phoneNumber: Yup.string().required("required"),
            userType: Yup.string().required("required"),
            // tier: Yup.string().when('userType', {is: "student", then: Yup.string().required("required"), otherwise: Yup.string()}),
        }),
        onSubmit: (values) => {
            console.log(values)
            //consume the registration api
            register()
            // resetForm()
        }
    })
    return (
        <div>
            <NavBar />
            <div className="registration-form-container">
                <h2>Register new account</h2>
                <p>{registerMsg}</p>
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
                                value="instructor" />
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
                            {/* <option disabled selected name="selectGender">-- select your gender --</option> */}
                            <option value="">-- select gender --</option>
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
                            id="tier"
                            name="tier"
                            value={formik.values.tier}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">Select a tier</option>
                            {tiers.map(tier => (
                                <option key={tier.tier_code} value={tier.tier_code}>
                                    {tier.tier_name}
                                </option>
                            ))}
                        </select>
                        {formik.touched.tier && formik.errors.tier ? <p className="error-message">{formik.errors.tier}</p> : null}
                    </div>}
                    {formik.values.userType === "instructor" && <div class="form-group">
                        <label for="field">Field</label>
                        <select
                            id="field"
                            name="field"
                            value={formik.values.field}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">Select a field</option>
                            {fields.map(field => (
                                <option key={field.field_code} value={field.field_code}>
                                    {field.field_name}
                                </option>
                            ))}
                        </select>
                        {formik.touched.field && formik.errors.field ? <p className="error-message">{formik.errors.field}</p> : null}
                    </div>}
                    <button type="submit">Create account</button>
                </form>
            </div>
        </div>
    )
}
import React from "react"
import { useEffect, useState } from "react";
import NavBar from "./navbar";
import './profile.css'
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios"
import { fetchUserData } from "../slices/user-slice";

export default function Profile() {
    const dispatch = useDispatch()
    const getUserInfo = () => {
        Axios.get("http://localhost:5000/profile").then(async response => {
            await dispatch(fetchUserData(response.data.results))  
            console.log("response ==> ", response.data.results)
        }).then(error => {
            console.log("ERROR --> ", error)
        })
    }
    useEffect(() => {
        console.log("Profile mounted")
        getUserInfo()
        console.log("fetched")
    })

    const handleCancelEdit = () => {
        formik.setValues(formik.initialValues)
        setEditing(false)
    }

    const formik = useFormik({
        initialValues: {
            firstname: useSelector(state => state.userReducer.firstname),
            lastname: useSelector(state => state.userReducer.lastname),
            email: useSelector(state => state.userReducer.email),
            phoneNumber: useSelector(state => state.userReducer.phoneNumber),
            wilaya: 'batna',
        }, validationSchema: Yup.object({
            firstname: Yup.string().required("cannot leave this field empty"),
            lastname: Yup.string().required("cannot leave this field empty"),
            phoneNumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
            wilaya: Yup.string(),
        }), onSubmit: (values) => {
            console.log(values)
            //send to backend
            setEditing(false)
        }
    })
    const [editing, setEditing] = useState(false);
    return (
        <div>
            <NavBar />
            <div className="profile-page-container">
                {/* <img className="profile-picture" src="https://placekitten.com/200/200" alt="Profile picture" /> */}
                {editing ? (
                    <form className="profile-form" onSubmit={formik.handleSubmit}>
                        <h3>Personal information</h3>
                        <label for="firstname">Firstname:</label>
                        <input
                            name="firstname"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstname}
                        />
                        {formik.touched.firstname && formik.errors.firstname ? <p className="error-message">{formik.errors.firstname}</p> : null}
                        <label for="lastname">Lastname:</label>
                        <input
                            name="lastname"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastname}
                        />
                        {formik.touched.lastname && formik.errors.lastname ? <p className="error-message">{formik.errors.lastname}</p> : null}
                        <label for="email">Email:</label>
                        <input disabled type="email" id="email" value={formik.values.email} />
                        <label for="phoneNumber">Phone number:</label>
                        <input
                            name="phoneNumber"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneNumber}
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? <p className="error-message">{formik.errors.phoneNumber}</p> : null}
                        <label for="wilaya">Wilaya</label>
                        <input
                            name="wilaya"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.wilaya}
                        />
                        {formik.touched.wilaya && formik.errors.wilaya ? <p className="error-message">{formik.errors.wilaya}</p> : null}



                        <button type="submit">Save</button>
                        <button type="button" onClick={handleCancelEdit}>Cancel</button>
                    </form>
                ) : (
                    <div className="profile-info">
                        <h2>{formik.values.firstname} {formik.values.lastname}</h2>
                        <p>{formik.values.email}</p>
                        {formik.values.phoneNumber && <p>{formik.values.phoneNumber}</p>}
                        {formik.values.wilaya && <p>{formik.values.wilaya}</p>}
                        <button type="button" onClick={() => { setEditing(true) }}>Edit</button>
                    </div>
                )}
            </div>

        </div >
    )
}
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import Axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import "./changePassword.css"

export default function ChangePassword() {
    const [edited, setEdited] = useState(false)
    const changePassword = () => {
        toast.loading("updating password ..")
        Axios.put("http://localhost:5000/profile/edit-user-info/security/password", {
            oldPassword: formik.values.oldPassword,
            newPassword: formik.values.newPassword,
            newPasswordc: formik.values.newPasswordc,
        }).then(response => {
            toast.dismiss()
            toast.success(response.data.succMsg)
            setEdited(false)
            toast("an email was sent to you")
            formik.resetForm()
        }).catch(error => {
            toast.error(error.response.data.errMsg)
        })
    }
    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            newPasswordc: ''
        }, validationSchema: Yup.object({
            oldPassword: Yup.string().min(8, "password must be 8 characters long").required("required"),
            newPassword: Yup.string().min(8, "password must be 8 characters long").matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                'Password must contain at least one uppercase character, one symbol, and one number').required("required"),
            newPasswordc: Yup.string().oneOf([Yup.ref("newPassword"), null], "passwords must match").required("required"),
        }), onSubmit: (values) => {
            changePassword()
        }
    })
    useEffect(() => {
        if (formik.values !== formik.initialValues) {
            setEdited(true)
        }
    })
    return (
        <div>
            <Toaster />
            <form className="change-password-form" onSubmit={formik.handleSubmit}>
                <h3>Change password</h3>
                <label for="oldPassword">Old password:</label>
                <input
                    name="oldPassword"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.oldPassword}
                />
                {formik.touched.oldPassword && formik.errors.oldPassword ? <p style={{fontSize: '12px', color: 'red'}}>{formik.errors.oldPassword}</p> : null}
                <label for="newPassword">New password:</label>
                <input
                    name="newPassword"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? <p style={{fontSize: '12px', color: 'red'}}>{formik.errors.newPassword}</p> : null}
                <label for="newPasswordc">Confirm new password:</label>
                <input
                    name="newPasswordc"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPasswordc}
                />
                {formik.touched.newPasswordc && formik.errors.newPasswordc ? <p style={{fontSize: '12px', color: 'red'}}>{formik.errors.newPasswordc}</p> : null}
                {edited && <button type="submit">Save changes</button>}
            </form>
        </div>
    )
}

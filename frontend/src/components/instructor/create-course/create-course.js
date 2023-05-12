import React, { useState, useEffect } from 'react'
import Axios from "axios"
import "./create-course.css"
import { Form, useFormik } from 'formik'
import * as Yup from "yup"
import SideBar from '../side-bar/side-bar'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

export default function CreateCourse() {
    const navigate = useNavigate()
    const [picture, setPicture] = useState(null)
    const [tiers, setTiers] = useState([])
    const createCourse = (course) => {
        toast.loading("Creating course")
        const formData = new FormData()
        formData.append('course_title', course.courseTitle);
        formData.append('course_description', course.courseDesc);
        formData.append('course_price', course.price);
        formData.append('tier_code', course.tier);
        formData.append('field_code', course.field);
        picture && formData.append('picture', picture);
        console.log("picture ===> ", picture)
        console.log("formdata ===> ", formData)
        Axios.post("http://localhost:5000/course/create-course", formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            console.log(response.data.succMsg)
            toast.dismiss()
            setTimeout(() => {navigate("/instructor-my-courses")}, 2000)
            toast.success(response.data.succMsg)
        }).catch(error => {
            console.log(error.response.data.errMsg)
            toast.dismiss()
            toast.error(error.response.data.errMsg)
        })
    }
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
        getTiers()
        getFields()
    }, [])
    const [fields, setFields] = useState([])
    const formik = useFormik({
        initialValues: {
            courseTitle: "",
            courseDesc: "",
            price: "",
            tier: "",
            field: "",
        },
        validationSchema: Yup.object({
            courseTitle: Yup.string().max(100, "too long title").required("required"),
            courseDesc: Yup.string().max(300, "too long description").required("required"),
            price: Yup.number().required("required"),
            tier: Yup.number().required("required"),
            field: Yup.number().required("required"),
        }),
        onSubmit: (values) => {
            console.log(values)
            createCourse(values)
        }
    })
    return (
        <div className='create-course'>
            <Toaster />
            <SideBar />
            <div className='form-group'>
                <label for="picture">Choose a banner picture for your course</label>
                <br />
                <input type="file" name="picture" accept=".jpg,.jpeg,.png" onChange={(event) => { setPicture(event.target.files[0]) }} />
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label for="courseTitle">Course title</label>
                    <input
                        name="courseTitle"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.courseTitle}
                    />
                    {formik.touched.courseTitle && formik.errors.courseTitle ? <p className="error-message">{formik.errors.courseTitle}</p> : null}
                </div>
                <div className="form-group">
                    <label for="courseDesc">Course description</label>
                    <textarea
                        name="courseDesc"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.courseDesc}
                    />
                    {formik.touched.courseDesc && formik.errors.courseDesc ? <p className="error-message">{formik.errors.courseDesc}</p> : null}
                </div>
                <div className="form-group">
                    <label for="price">Course Pricing (DA)</label>
                    <input
                        name="price"
                        type="number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
                    />
                    {formik.touched.price && formik.errors.price ? <p className="error-message">{formik.errors.price}</p> : null}
                </div>
                <div className="form-group">
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
                </div>
                <div className="form-group">
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
                </div>
                <button type='submit'>Create Course</button>
            </form>
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./course-details.css"
import Axios from "axios"
import ReactLoading from 'react-loading';
import BannerPlaceholder from "../../../../icons/course_banner_placeholder.png"
import toast, { Toaster } from 'react-hot-toast';

export default function CourseDetails() {
    const location = useLocation()
    const navigate = useNavigate()
    const [enrolled, setEnrolled] = useState(false)
    const CheckEnrolledCourse = (id) => {
        Axios.get(`http://localhost:5000/course/${id}/enrolled-course`).then(response => {
            console.log("is enrolled ===> ", response.data.results[0])
            if (response.data.results[0].counts > 0) {
                setEnrolled(true)
            } else {
                setEnrolled(false)
            }
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    const enroll = (courseId) => {
        Axios.post(`http://localhost:5000/course/${courseId}/enroll-course`).then(response => {
            console.log(response.data.succMsg)
            toast.success(response.data.succMsg)
            setEnrolled(true)
        }).catch(error => {
            console.log(error.response.data.errMsg)
            toast.error(error.response.data.errMsg)
        })
    }
    const getCourse = (courseId) => {
        Axios.get(`http://localhost:5000/course/${courseId}/course-details`).then(response => {
            console.log(response.data.succMsg)
            console.log(response.data.results)
            setCourse(response.data.results[0])
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    const [course, setCourse] = useState(null)
    useEffect(() => {
        if (location.state && location.state.courseId) {
            console.log(location.state.courseId)
            getCourse(location.state.courseId)
            CheckEnrolledCourse(location.state.courseId)
        }
    }, [location.state.courseId])

    useEffect(() => {
        console.log("course is ", course)
        console.log("enrolled state is ", enrolled)
    }, [enrolled])

    if (!course) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ReactLoading type={'spin'} color={'#007bff'} height={100} width={100} />
            </div>
        )
    }
    return (
        <div className="course-details">
            <Toaster />
            <div className="banner">
                <img src={course.course_picture ? course.course_picture : BannerPlaceholder} alt={"title"} />
            </div>
            <div className="content">
                <h2>{course.course_title}</h2>
                <p>{course.course_description}</p>
                <div className="info">
                    <p>Instructor: {course.user_firstName + " " + course.user_lastName}</p>
                    <p>Creation Date: {course.course_created_date}</p>
                    <p>Tier: {course.tier_name}</p>
                    <p>Field: {course.field_name}</p>
                </div>
                <div className="enroll">
                    <p>Price: {course.course_price} DA</p>
                    {enrolled === false ? <button onClick={() => { enroll(course.course_id) }} className="enroll-button">Enroll</button> : <button onClick={() => {navigate("/course-library")}} className="enroll-button">Go to library</button>}
                </div>
            </div>
        </div>
    )
}

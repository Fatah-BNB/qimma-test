import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./course-details.css"
import Axios from "axios"
import ReactLoading from 'react-loading';
import BannerPlaceholder from "../../../../icons/course_banner_placeholder.png"

export default function CourseDetails() {
    const location = useLocation()
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
        if (location.state.courseId) {
            console.log(location.state.courseId)
            getCourse(location.state.courseId)
        }
    }, [])

    useEffect(() => {
        console.log("course is ", course)
    }, [course])

    if (!course) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ReactLoading type={'spin'} color={'#007bff'} height={100} width={100} />
            </div>
        )
    }
    return (
        <div className="course-details">
            <div className="banner">
                <img src={course.course_picture ? course.course_picture : BannerPlaceholder} alt={"title"} />
            </div>
            <div className="content">
                <h2>{course.course_title}</h2>
                <p>{course.course_description}</p>
                <div className="info">
                    <p>Instructor: {course.user_firstName + " " + course.user_lastName}</p>
                    <p>Creation Date: {course.course_created_date}</p>
                    <p>Tier: {course.tier}</p>
                    <p>Field: {course.field}</p>
                </div>
                <div className="enroll">
                    <p>Price: {course.course_price} DA</p>
                    <button className="enroll-button">Enroll</button>
                </div>
            </div>
        </div>
    )
}

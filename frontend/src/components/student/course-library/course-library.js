import React, { useState, useEffect } from 'react'
import Axios from "axios"
import "./course-library.css"
import CourseItem from '../course-item/course-item'
import BannerPlaceholder from "../../../icons/course_banner_placeholder.png"
import NavBar from "../../user/navbar/navbar"

export default function CourseLibrary() {
    const [courses, setCourses] = useState([])
    const getStudentCourses = () => {
        Axios.get("http://localhost:5000/student/enrolled-courses").then(response => {
            console.log(response.data.succMsg)
            console.log(response.data.results)
            setCourses(response.data.results)
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    useEffect(() => {
        getStudentCourses()
    }, [])
    return (
        <div>
            <NavBar />
            {courses.length > 0 ? (courses.map((course) => (
                <CourseItem
                    title={course[0].course_title}
                    image={course[0].course_picture ? course[0].course_picture : BannerPlaceholder}
                    instructor={course[0].user_firstName + " " + course[0].user_lastName}
                />
            ))) : <h1>My courses</h1>}
        </div>
    )
}

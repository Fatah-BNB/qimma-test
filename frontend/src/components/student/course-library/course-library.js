import React, {useState, useEffect} from 'react'
import Axios from "axios"
import "./course-library.css"

export default function CourseLibrary() {
    const getStudentCourses = () => {
        Axios.get("http://localhost:5000/student/enrolled-courses").then(response => {
            console.log(response.data.succMsg)
            console.log(response.data.results)
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    useEffect(() => {
        getStudentCourses()
    }, [])
    return (
        <div>course-library</div>
    )
}

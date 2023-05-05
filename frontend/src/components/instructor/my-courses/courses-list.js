import React, { useEffect, useState } from 'react'
import Axios from "axios"
import SideBar from '../side-bar/side-bar'
import CourseCard from './course-card'
import "./courses-list.css"
import { useNavigate } from 'react-router-dom'

export default function CoursesList() {
    const [courses, setCourses] = useState([])
    const getCourses = () => {
        Axios.get("http://localhost:5000/manage-courses/my-courses").then(response => {
            console.log("COURSES RESULTS: ", response.data.results)
            setCourses(response.data.results)
        }).catch(error => {
            console.log("ERROR RETREIVING COURSES: ", error)
        })
    }
    const publishCourse = (courseTitle) => {
        Axios.put("http://localhost:5000/manage-courses/publish-course", {courseTitle}).then(response => {
            console.log(response.data.succMsg)
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }


    const navigate = useNavigate()

    useEffect(() => {
        getCourses()
    }, [])
    return (
        <div>
            <SideBar />
            <div className='course-grid'>
                {courses.length > 1 ?
                    courses.map((course) => (
                        <CourseCard
                            title={course.course_title}
                            description={course.course_description}
                            image={course.course_picture}
                            price={course.course_price}
                            published={course.published}
                            publishCourse={() => {publishCourse(course.course_title)}}
                        />
                    )) : <h1>My courses</h1>
                }
                <button onClick={() => { navigate("/instructor/create-course/course-details") }} className="floating-button">+</button>
            </div>

        </div>
    )
}
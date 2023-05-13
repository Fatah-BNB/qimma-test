import React, {useState, useEffect} from "react"
import "./home.css"
import Axios from "axios"
import NavBar from "../../user/navbar/navbar"
import PublishedCourseCard from "./published-courses/published-course-card"
import BannerPlaceholder from "../../../icons/course_banner_placeholder.png"

export default function Home() {
    const [courses, setCourses] = useState([])
    const getPublishedCourses = () => {
        Axios.get("http://localhost:5000/course/published-courses").then(response => {
            console.log(response.data.succMsg)
            console.log(response.data.results)
            setCourses(response.data.results)
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    useEffect(() => {
        console.log("Home mounted")
        getPublishedCourses()
    }, [])
    return (
        <div className="container">
            <NavBar />
            <div className="course-list">
                {courses.map(course => (
                    <PublishedCourseCard
                        bannerImg={course.course_picture ? course.course_picture : BannerPlaceholder}
                        title={course.course_title}
                        price={course.course_price}
                        instructor={course.user_firstName + " "+ course.user_lastName}
                        onEnroll={() => alert(`Enrolling in ${course.course_title}`)}
                    />
                ))}
            </div>
        </div>
    )
}
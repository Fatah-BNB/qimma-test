import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./home.css"
import Axios from "axios"
import NavBar from "../../user/navbar/navbar"
import PublishedCourseCard from "./published-courses/published-course-card"
import BannerPlaceholder from "../../../icons/course_banner_placeholder.png"
import ReactLoading from 'react-loading';
import toast, { Toaster } from "react-hot-toast"

export default function Home() {
    const navigate = useNavigate()
    const enroll = (courseId) => {
        Axios.post(`http://localhost:5000/course/${courseId}/enroll-course`).then(response => {
            console.log(response.data.succMsg)
            toast.success(response.data.succMsg)
        }).catch(error => {
            console.log(error.response.data.errMsg)
            toast.error(error.response.data.errMsg)
        })
    }
    const goToCourse = (courseId) => {
        navigate("/course-details", {
            state: {
                courseId: courseId
            }
        })
    }
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const getPublishedCourses = () => {
        setLoading(true)
        Axios.get("http://localhost:5000/course/published-courses").then(response => {
            console.log(response.data.succMsg)
            console.log(response.data.results)
            setLoading(false)
            setCourses(response.data.results)
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }
    useEffect(() => {
        getPublishedCourses()
    }, [])
    return (
        <div className="container">
            <NavBar />
            <Toaster />
            {
                loading ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <ReactLoading type={'spin'} color={'#007bff'} height={100} width={100} />
                    </div> :
                    <div className="course-list">
                        {courses.map(course => (
                            <PublishedCourseCard
                                bannerImg={course.course_picture ? course.course_picture : BannerPlaceholder}
                                title={course.course_title}
                                price={course.course_price}
                                instructor={course.user_firstName + " " + course.user_lastName}
                                onEnroll={() => enroll(course.course_id)}
                                goToCourse={() => { goToCourse(course.course_id) }}
                            />
                        ))}
                    </div>
            }
        </div>
    )
}
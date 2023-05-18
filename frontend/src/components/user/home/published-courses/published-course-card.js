import React, { useState, useEffect } from "react"
import "./published-course-card.css"
import Axios from "axios"

const PublishedCourseCard = ({ id, bannerImg, title, price, instructor, onEnroll, goToCourse }) => {
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
    useEffect(() => {
        CheckEnrolledCourse(id)
    }, [enrolled, id])
    return (
        <div className="course-card">
            <div className="course-card__image-container">
                <img className="course-card__image" src={bannerImg} alt={title} />
            </div>
            <div className="course-card__content">
                <h3 onClick={goToCourse} className="course-card__title">{title}</h3>
                <p className="course-card__price">{price} DA</p>
                <p className="course-card__instructor"><span style={{ fontWeight: "lighter" }}>Instructor: </span>{instructor}</p>
                {enrolled == false ? <button className="course-card__enroll-button" onClick={onEnroll}>
                    Enroll
                </button> : <button className="course-card__enroll-button">Go to Library</button>}
            </div>
        </div>
    );
};

export default PublishedCourseCard;


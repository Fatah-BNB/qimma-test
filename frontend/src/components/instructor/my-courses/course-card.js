import React, { useState, useEffect } from 'react'
import "./course-card.css"

const CourseCard = ({ title, date, description, image, price, published, publishCourse, deleteCourse }) => {
    const [coursePublished, setPublished] = useState(0)
    useEffect(() => {
        published === 0 ? setPublished(0) : setPublished(1)
    })
    return (
        <div className="course-card">
            <div className="course-image">
                <img src={image} alt={title} />
            </div>
            <div className="course-info">
                <h2 className="course-title">{title}</h2>
                <p className="course-description">{description}</p>
                <div className='course-status'>
                    <p className="course-price">{price} DA</p>
                    {coursePublished === 0 ? <button onClick={publishCourse} className="publish-course-button">Publish</button> : null}
                    <button className="edit-course-button">Edit</button>
                    <button onClick={deleteCourse} className="edit-course-button">Delete</button>
                </div>
                <p className="course-description">{date}</p>
            </div>
        </div>
    );
};

export default CourseCard
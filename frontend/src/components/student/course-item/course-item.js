import React from 'react';
import "./course-item.css"

const CourseItem = ({ title, instructor, image }) => {
    return (
        <div class="course-list">
            <div class="course-item">
                <img class="course-image" src={image} alt={title} />
                <div class="course-details">
                    <h3 class="course-title">{title}</h3>
                    <p class="course-instructor">Instructor: {instructor}</p>
                </div>
            </div>
        </div>

    );
};

export default CourseItem;

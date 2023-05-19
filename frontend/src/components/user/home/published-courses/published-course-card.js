import React from "react"
import "./published-course-card.css"

const PublishedCourseCard = ({ bannerImg, title, price, instructor, goToCourse }) => {
    return (
        <div className="course-card" onClick={goToCourse}>
            <div className="course-card__image-container">
                <img className="course-card__image" src={bannerImg} alt={title} />
            </div>
            <div className="course-card__content">
                <h3 className="course-card__title">{title}</h3>
                <p className="course-card__price">{price} DA</p>
                <p className="course-card__instructor"><span style={{ fontWeight: "lighter" }}>Instructor: </span>{instructor}</p>
            </div>
        </div>
    );
};

export default PublishedCourseCard;


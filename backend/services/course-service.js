const db = require('../config/db');
const cloudinary = require('../config/cloudinary')

function createCourse(course, pictureUrl, instructor_id) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            pictureUrl, {
            resource_type: "image",
            type: "upload",
            use_filename: true,
            unique_filename: true
        }, function (error, result) {
            if (error) {
                console.log('error while uploading course picture', error)
                reject(error);

            } else {
                console.log("IMAGE RESULTS ++++++++++>>>", result)
                resolve(result);
            }
        });
    }).then((result) => {
        const { course_title, course_description, course_price, tier_code, field_code } = course
        const course_picture = result.secure_url
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO course SET ?', { course_title, course_description, course_picture, course_price, tier_code, field_code, instructor_id }, (error, results) => {
                if (error) {
                    console.log('error while inserting course', error)
                    reject(error)
                } else {
                    resolve(results)
                }
            })
        })
    })
}

function createCourseSimple(course, instructor_id) {
    return new Promise((resolve, reject) => {
        const { course_title, course_description, course_price, tier_code, field_code } = course
        db.query('INSERT INTO course SET ?', { course_title, course_description, course_price, tier_code, field_code, instructor_id }, (error, results) => {
            if (error) {
                console.log('error while inserting course', error)
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

function uploadCoursePicture(course_id, pictureUrl) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            pictureUrl, {
            resource_type: "image",
            type: "upload",
            use_filename: true,
            unique_filename: true
        }, function (error, result) {
            if (error) {
                console.log('error while uploading course picture', error)
                reject(error);
            } else {
                console.log("IMAGE RESULTS ++++++++++>>>", result)
                resolve(result);
            }
        })
    }).then((result) => {
        const course_picture = result.secure_url
        return new Promise((resolve, reject) => {
            db.query('UPDATE course SET course_picture = ? where course_id = ?', [course_picture, course_id], (error, results) => {
                if (error) {
                    console.log('error while inserting course picture', error)
                    reject(error)
                } else {
                    resolve(results)
                }
            })
        })
    })

}

function retrievePublishedCourses(){
    return new Promise((resolve, reject)=>{
        const SqlQuery = "SELECT course.course_id, course.course_title, course.course_picture, course.course_price, user.user_firstName, user.user_lastName "+
        " FROM course "+
        "INNER JOIN instructor ON course.instructor_id = instructor.instructor_id "+
        "INNER JOIN user ON instructor.user_id = user.user_id "+
        "WHERE published = 1 order by course_created_at desc"
        db.query(SqlQuery, (error, results)=>{
            if(error){
                console.log("error while retrieveing published courses", error)
                reject(error)
            }else{
                resolve(results)
            }
        })
    })
}

function CourseDetails(course_id){
    return new Promise((resolve, reject)=>{
        const SqlQuery = "SELECT course.course_title, course.course_picture, course.course_price, course.course_description, DATE_FORMAT(course.course_created_at, \'%Y-%m-%d\') AS course_created_date, "+
        "user.user_firstName, user.user_lastName "+
        " FROM course "+
        "INNER JOIN instructor ON course.instructor_id = instructor.instructor_id "+
        "INNER JOIN user ON instructor.user_id = user.user_id "+
        "WHERE course.course_id = ?"
        db.query(SqlQuery, [course_id], (error, results)=>{
            if(error){
                console.log("error while retrieveing course details", error)
                reject(error)
            }else{
                resolve(results)
            }
        })
    })
}

function EnrollCourse(course_id, student_id){
    const SqlQuery = "insert into student_has_course set ?"
    const args = {course_id: course_id, student_id: student_id}
    return new Promise((resolve, reject)=>{
        db.query(SqlQuery, args, (error, results)=>{
            if(error){
                console.log("error while adding course to stduent library", error)
                reject(error)
            }else{
                resolve(results)
            }
        })
    })
}


module.exports = { createCourse, uploadCoursePicture, createCourseSimple,
    retrievePublishedCourses, CourseDetails, EnrollCourse
 }
const db = require('../config/db')

function retrieveEnrolledCourses(student_id) {
    const SqlQuery = "select course_id from student_has_course where student_id = ?"
    return new Promise((resolve, reject) => {
        db.query(SqlQuery, [student_id], (error, results) => {// retrieve enrolled courses for specific student
            if (error) {
                console.log('error while retrieving enrolled courses', error)
                reject(error)
            } else {
                resolve(results)
            }
        })
    }).then((FiResults) => {
        let CourseDetails = []
        return new Promise(async (resolve, reject)=>{// loop through course ids and retrieve details for each course and return enrolled courses
            try{
                for (let i = 0; i < FiResults.length; i++) {
                    const course_id = FiResults[i].course_id
                    const courseDetailsPromise = await new Promise((resolve, reject) => {
                        const SqlQuery = "SELECT course.course_title, course.course_picture, course.course_price, user.user_firstName, user.user_lastName " +
                            " FROM course " +
                            "INNER JOIN instructor ON course.instructor_id = instructor.instructor_id " +
                            "INNER JOIN user ON instructor.user_id = user.user_id " +
                            "WHERE course_id = ?; "
                        db.query(SqlQuery, [course_id], (error, results) => {
                            if (error) {
                                console.log("error while retrieveing enrolled course details", error)
                                reject(error)
                            } else {
                                console.log("course details", results)
                                resolve(results)
                            }
                        })
                    })
                    CourseDetails.push(courseDetailsPromise);
                }
                resolve(CourseDetails)
            }catch (error){
                console.log("error on try block", error)
                reject(error)
            }
            
        })
    })
}

function rateCourse(course_rating, course_id, student_id){
    return new Promise((resolve, reject)=>{
        const SqlQuery = "update student_has_course set course_rating = ? where course_id = ? and student_id = ?"
        db.query(SqlQuery, [course_rating, course_id, student_id], (error, results)=>{
            if(error){
                console.log("error while updating student_has_course", error)
                reject(error)
            }else{
                resolve(results)
            }
        })
    })
}

module.exports = { retrieveEnrolledCourses, rateCourse }
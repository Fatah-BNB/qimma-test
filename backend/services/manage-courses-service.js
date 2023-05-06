const db = require('../config/db')

function retrieveInstructorCourses(instructor_id) {
    return new Promise((resolve, reject) => {
        db.query('select * from course where instructor_id = ?', [instructor_id],
            (error, results) => {
                if (error) {
                    console.log("error while retrieving coures info", error)
                    reject(error)
                } else {
                    resolve(results)
                }
            })
    })
}

function publishCourse(course_id, course_instructor_id) {
    return new Promise((resolve, reject) => {
        db.query("update course set published = 1 where course_id = ? and instructor_id = ?", [course_id, course_instructor_id], (err, res) => {
            if (err) {
                console.log("ERROR PUBLISHING COURSE: ", err)
                reject(err)
            } else {
                resolve(res)
            }
        })
    }).then(results => {
        return new Promise((resolve, reject) => {
            db.query("select * from course where course_id = ?", [course_id], (err, res) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }else{
                    resolve(res)
                }
            })
        })
    })
}

module.exports = { retrieveInstructorCourses, publishCourse }
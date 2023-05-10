const db = require('../config/db')

function retrieveInstructorCourses(instructor_id) {
    return new Promise((resolve, reject) => {
        db.query('select course_title, course_picture, published, course_price, DATE_FORMAT(course_created_at, \'%Y-%m-%d %H:%i:%s\') AS course_created_at from course where instructor_id = ?  ORDER BY course_created_at DESC;', [instructor_id],
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

function deleteCourse(course_id){
    return new Promise((resolve, reject) => {
        console.log('delete course: ', course_id)
        db.query("delete from course where course_id = ?", [course_id], (err, res) => {
            if (err) {
                console.log("ERROR DELETING COURSE: ", err)
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

module.exports = { retrieveInstructorCourses, publishCourse, deleteCourse }
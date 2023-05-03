const db = require('../config/db')

function retrieveInstructorCourses(instructor_id){
    return new Promise((resolve, reject)=>{
        db.query('SELECT course_title, course_picture, published, course_price FROM course WHERE instructor_id = ?', [instructor_id],
        (error, results)=>{
            if(error){
                console.log("error while retrieving coures info", error)
                reject(error)
            }else{
                resolve(results)
            }
        })
    })
}

module.exports = {retrieveInstructorCourses}
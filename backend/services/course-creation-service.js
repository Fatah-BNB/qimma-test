const db = require('../config/db');

function createCourse(course, instructor_id){
    const {course_title, course_description, course_price, tier_code, field_code} = course
    return new Promise((resolve, reject)=>{
       db.query('INSERT INTO course SET ?', {course_title, course_description, course_price, tier_code, field_code, instructor_id}, (error, results)=>{
        if(error){
            console.log('error while inserting course', error)
            reject(error)
        }else{
            resolve(results)
        }
       })
    })
}

module.exports = {createCourse}
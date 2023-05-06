const db = require('../config/db');
const cloudinary = require('../config/cloudinary')

function createCourse(course, instructor_id) {
    const { courseTitle, courseDesc, price, tier, field } = course
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO course (course_title, course_description, course_price, tier_code, field_code, instructor_id) values (?,?,?,?,?,?)', [courseTitle, courseDesc, price, tier, field, instructor_id], (error, results) => {
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

module.exports = { createCourse, uploadCoursePicture }
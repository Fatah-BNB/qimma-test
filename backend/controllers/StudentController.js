const studentService = require('../services/student-service');


function retrieveEnrolledCoursesCntrl(req, res) {
    const studentId = req.authData.userTypeIds
    studentService.retrieveEnrolledCourses(studentId).then((results) => {
        res.status(200).send({ succMsg: "retrieve enrolled courses", results: results});
    }).catch((error) => {
        res.status(500).send({ errMsg: "Cannot get enrolled courses" });
    });

}

function rateCourseCntrl(req, res){
    const studentId = req.authData.userTypeIds
    const courseId = req.params.courseId
    const courseRating = req.body.course_rating
    studentService.rateCourse(courseRating, courseId, studentId).then((results) => {
        res.status(200).send({ succMsg: "course rated"});
    }).catch((error) => {
        res.status(500).send({ errMsg: "Cannot rate course"});
    });
}

module.exports = { retrieveEnrolledCoursesCntrl, rateCourseCntrl}
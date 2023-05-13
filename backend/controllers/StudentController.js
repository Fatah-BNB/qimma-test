const studentService = require('../services/student-service');


function retrieveEnrolledCoursesCntrl(req, res) {
    const studentId = req.authData.userTypeIds
    studentService.retrieveEnrolledCourses(studentId).then((results) => {
        res.status(200).send({ succMsg: "retrieve enrolled courses", results: results});
    }).catch((error) => {
        res.status(500).send({ errMsg: "Cannot get enrolled courses" });
    });

}

module.exports = { retrieveEnrolledCoursesCntrl}
const manageCourses = require('../services/manage-courses-service')

function retrieveInstructorCoursesCntrl(req, res) {
    const instructorId = req.authData.userTypeIds
    manageCourses.retrieveInstructorCourses(instructorId).then((results) => {
        res.status(200).send({ succMsg: "instructor courses", results: results });
    }).catch((error) => {
        res.status(500).send({ errMsg: 'cannot get instructor courses' })
    })
}

function publishCourseCntrl(req, res) {
    const instructorId = req.authData.userTypeIds
    const courseTitle = req.body.courseTitle
    manageCourses.publishCourse(courseTitle, instructorId).then((results) => {
        console.log("RESULTS ===? ", results)
        res.status(200).send({ succMsg: "course published" });
    }).catch((error) => {
        console.log("EROORS ===? ", error)
        res.status(400).send({ errMsg: 'cannot publish course ' + instructorId + " " + courseTitle })
    })
}
module.exports = { retrieveInstructorCoursesCntrl, publishCourseCntrl }
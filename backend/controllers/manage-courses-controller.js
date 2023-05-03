const manageCourses = require('../services/manage-courses-service')

function retrieveInstructorCoursesCntrl(req, res){
    const instructorId = req.params.instructorId
    manageCourses.retrieveInstructorCourses(instructorId).then((results)=>{
        res.status(200).send({ succMsg: "instructor courses", results: results });
    }).catch((error)=>{
        res.status(500).send({ errMsg: 'cannot get instructor courses'})
    })
}
module.exports = {retrieveInstructorCoursesCntrl}
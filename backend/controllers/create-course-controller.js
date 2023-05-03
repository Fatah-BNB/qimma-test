const courseCreationService = require('../services/course-creation-service')

function createCourse(req, res){
    instructorId = req.authData.userTypeIds
    course = req.body
    courseCreationService.createCourse(course, instructorId).then((results)=>{
        res.status(200).send({ succMsg: "Course created", results: results.insertId });
    }).catch((error)=>{
        res.status(500).send({errMsg: 'cannot create course'})
    })
}

module.exports = {createCourse}
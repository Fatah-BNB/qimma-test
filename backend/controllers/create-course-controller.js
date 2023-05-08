const courseCreationService = require('../services/course-creation-service')

function createCourseCntrl(req, res){
    instructorId = req.authData.userTypeIds
    course = req.body
    console.log("COURSE VARIABLES = ", course)
    const pictureUrl = req.file.path;
    console.log("COURSE PICTURE = ", pictureUrl)
    courseCreationService.createCourse(course,  pictureUrl, instructorId).then((results)=>{
        res.status(200).send({ succMsg: "Course created", results: results.insertId });
    }).catch((error)=>{
        res.status(500).send({errMsg: 'cannot create course'})
    })
}

function uploadCoursePictureCntrl(req, res){
    const pictureUrl = req.file.path;
    courseId = req.params.courseId
    courseCreationService.uploadCoursePicture(courseId, pictureUrl).then((results)=>{
        res.status(200).send({ succMsg: "picture upladed "});
    }).catch((error)=>{
        res.status(500).send({errMsg: 'cannot upload picture'})
    })

}

module.exports = {createCourseCntrl, uploadCoursePictureCntrl}
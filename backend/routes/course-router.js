const courseController = require('../controllers/course-controller');
const checkToken = require('../middleware/checkToken')
const configCoursePictureStorage = require('../middleware/coursePictureSorage')
const express = require('express');

const router = express.Router();


router.post('/create-course',checkToken.verifyToken('instructor'), configCoursePictureStorage.single('picture'), courseController.createCourseCntrl);
router.get('/published-courses', courseController.retrievePublishedCoursesCntrl);
module.exports = router;
const StudentController = require('../controllers/StudentController');
const checkToken = require('../middleware/checkToken')
const express = require('express');

const router = express.Router();


router.get('/enrolled-courses',checkToken.verifyToken('student'), StudentController.retrieveEnrolledCoursesCntrl);
router.put('/rate-course/:courseId',checkToken.verifyToken('student'), StudentController.rateCourseCntrl);
module.exports = router;
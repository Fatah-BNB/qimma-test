const express = require('express');
const router = express.Router();
const checkToken = require('../middleware/checkToken')
const manageCoursesController = require('../controllers/manage-courses-controller')
router.get('/my-courses', checkToken.verifyToken('instructor'), manageCoursesController.retrieveInstructorCoursesCntrl)
router.delete('/:courseId', checkToken.verifyToken('instructor'), manageCoursesController.deleteCourseCntrl)
router.put('/publish-course', checkToken.verifyToken('instructor'), manageCoursesController.publishCourseCntrl)

module.exports = router
const express = require('express');
const router = express.Router();
const checkToken = require('../middleware/checkToken')
const manageCoursesController = require('../controllers/manage-courses-controller')
router.get('/:instructorId/courses', checkToken.verifyToken('instructor'), manageCoursesController.retrieveInstructorCoursesCntrl)

module.exports = router
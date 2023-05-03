const courseController = require('../controllers/create-course-controller');
const checkToken = require('../middleware/checkToken')
const express = require('express');

const router = express.Router();


router.post('/create-course',checkToken.verifyToken('instructor'), courseController.createCourse);
module.exports = router;
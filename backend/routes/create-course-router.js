const courseController = require('../controllers/create-course-controller');
const checkToken = require('../middleware/checkToken')
const configCoursePictureStorage = require('../middleware/coursePictureSorage')
const express = require('express');

const router = express.Router();


router.post('/create-course',checkToken.verifyToken('instructor'), configCoursePictureStorage.single('picture'), courseController.createCourseCntrl);
module.exports = router;
const express = require('express');

const router = express.Router();
const userProfileController = require('../controllers/user-profile-controller');
const checkToken = require('../middleware/checkToken');

//-----------------profile----------------------------------------------------------------------
router.get('/', checkToken.verifyToken(['student', 'instructor', 'parent']), userProfileController.getUserInfoCntrl)


module.exports = router;

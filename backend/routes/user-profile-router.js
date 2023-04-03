const express = require('express');

const router = express.Router();
const userProfileController = require('../controllers/user-profile-controller');
const checkToken = require('../middleware/checkToken');

//-----------------profile----------------------------------------------------------------------
router.get('/', checkToken.verifyToken(['student', 'instructor', 'parent']), userProfileController.getUserInfoCntrl)
//update a single field
router.put('/edit-user-info/:field', checkToken.verifyToken(['student', 'instructor', 'parent']), userProfileController.updateFieldCntrl)
//update multiple fields
router.put('/edit-user-info', checkToken.verifyToken(['student', 'instructor', 'parent']), userProfileController.updateInfoCntrl)


module.exports = router;

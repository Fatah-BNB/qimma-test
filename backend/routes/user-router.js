const express = require('express');

const router = express.Router();
const userController = require('../controllers/user-controller');
const parentController = require('../controllers/parent-controller');
const checkToken = require('../middleware/checkToken');

//----------------authenticaiton and registration --------------------------------------------
router.post('/register', userController.registerController);
router.get('/verify-user-email/:username/:token', userController.updateEmailStatusCntrl);
router.post('/login', userController.loginController);
router.post('/login/resend-email-verification', userController.resendEmailVerificationCntrl);
router.get('/logout', userController.logoutController);
//-----------------Parent dashboards--------------------------------------------------------------------
router.post('/dashboard/create-child-account', checkToken.verifyToken, parentController.createChildAccountCntrl);
router.get('/dashboard/children-accounts', checkToken.verifyToken, parentController.getChildrenAccountsCntrl);

module.exports = router;

const express = require('express');

const router = express.Router();
const userController = require('../controllers/user-controller');
const checkToken = require('../middleware/checkToken');


router.post('/register', userController.registerController);
router.get('/verifyUserEmail/:username/:token', userController.updateEmailStatusCntrl);
router.post('/login', userController.loginController);
router.get('/logout', userController.logoutController);
router.get('/profile', checkToken.verifyToken, userController.profileController);

module.exports = router;

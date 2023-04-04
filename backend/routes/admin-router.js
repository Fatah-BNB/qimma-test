const adminController = require('../controllers/admin-controller');
const checkToken = require('../middleware/checkAdminToken')
const express = require('express');

const router = express.Router();


router.post('/login', adminController.loginController);
router.post('/logout', adminController.logoutController);
router.get('/users', checkToken.verifyToken, adminController.getAllUsersController);
router.post('/admin-count', adminController.countUsersController);

module.exports = router;

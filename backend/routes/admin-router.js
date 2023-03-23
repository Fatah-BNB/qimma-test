const adminController = require('../controllers/admin-controller');
const checkToken = require('../middleware/checkAdminToken')
const express = require('express');

const router = express.Router();


router.post('/login', adminController.loginController);
router.get('/users', checkToken.verifyToken, adminController.getAllUsersController);

module.exports = router;

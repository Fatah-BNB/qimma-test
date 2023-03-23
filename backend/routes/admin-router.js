const adminController = require('../controllers/admin-controller');
//const checkToken = require('../middleware/checkToken')
const express = require('express');

const router = express.Router();


router.post('/login', adminController.loginController);

module.exports = router;

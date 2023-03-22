const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const checkToken = require('../middleware/checkToken')

const userRouter = new Router();

userRouter.post('/register', userController.registerController);
userRouter.post('/login', userController.loginController);
userRouter.get('/logout', userController.logoutController);
userRouter.get('/users',checkToken.verifyToken, userController.getAllUsersController);
userRouter.get('/profile', checkToken.verifyToken, userController.profileController);

module.exports = userRouter;

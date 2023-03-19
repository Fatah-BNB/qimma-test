const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const checkToken = require('../middleware/checkToken')

const userRouter = new Router();

userRouter.post('/register', userController.registerController);
userRouter.post('/login', userController.loginController);
userRouter.get('/users', userController.getAllUsersController);
userRouter.get('/profile', checkToken.isLoggedIn, userController.profileController);

module.exports = userRouter;

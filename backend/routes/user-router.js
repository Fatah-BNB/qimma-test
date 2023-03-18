const Router = require('express').Router;
const userController = require('../controllers/user-controller');


const userRouter = new Router();

userRouter.post('/register', userController.registerController);
userRouter.post('/login', userController.loginController);
userRouter.get('/users', userController.getAllUsersController);

module.exports = userRouter;

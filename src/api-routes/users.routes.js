const UserRoutes = require('express').Router();
const UserControllers = require('../controllers/users.controllers');
const verifyToken = require('../middleware/auth.middleware');
const UsersValidators = require('../validators/users.validators');

UserRoutes.post('/register', UsersValidators.validateCreateUser, UserControllers.registerUser);

UserRoutes.head('/', verifyToken, UserControllers.detectIfUserAlreadyExist);

UserRoutes.get('/', verifyToken, UserControllers.getUsers);

UserRoutes.put('/:userId', verifyToken, UserControllers.updateUser);

UserRoutes.delete('/:userId', verifyToken, UserControllers.deleteUser);

// UserRoutes.put('/:userId/projects/:projectId', UserControllers.updateUser);

module.exports = UserRoutes;
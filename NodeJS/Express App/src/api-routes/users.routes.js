const UserRoutes = require('express').Router();
const UserControllers = require('../controllers/users.controllers');
const UsersValidators = require('../validators/users.validators');

UserRoutes.post('/', UsersValidators.validateCreateUser, UserControllers.createUser);

UserRoutes.get('/', UserControllers.getUsers);

UserRoutes.post('/bulk', UserControllers.createBulkUsers);

UserRoutes.put('/:userId', UserControllers.updateUser);

UserRoutes.delete('/:userId', UserControllers.deleteUser);

// UserRoutes.put('/:userId/projects/:projectId', UserControllers.updateUser);

module.exports = UserRoutes;
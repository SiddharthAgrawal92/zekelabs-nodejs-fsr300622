const UserRoutes = require('express').Router();
const UserControllers = require('../controllers/users.controllers');

UserRoutes.post('/', UserControllers.createUser);

UserRoutes.get('/', UserControllers.getUsers);

UserRoutes.post('/bulk', UserControllers.createBulkUsers);

UserRoutes.put('/:userId', UserControllers.updateUser);

// UserRoutes.put('/:userId/projects/:projectId', UserControllers.updateUser);

module.exports = UserRoutes;
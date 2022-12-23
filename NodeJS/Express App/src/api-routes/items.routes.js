const UserRoutes = require('express').Router();
const ItemsControllers = require('../controllers/items.controllers');
const ItemsValidators = require('../validators/items.validators');

UserRoutes.post('/bulk', ItemsValidators.validateCreateBulkItems, ItemsControllers.createBulkItems);

module.exports = UserRoutes;
const ItemRoutes = require('express').Router();
const ItemsControllers = require('../controllers/items.controllers');
const ItemsValidators = require('../validators/items.validators');

//creating many users
ItemRoutes.post('/bulk', ItemsValidators.validateCreateBulkItems, ItemsControllers.createBulkItems);

//get paginated records
ItemRoutes.get('/', ItemsValidators.validateGetItems, ItemsControllers.getItems);

//update item by Id
ItemRoutes.put('/:itemId', ItemsControllers.updateItem);

module.exports = ItemRoutes;
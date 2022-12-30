const playerRoutes = require('express').Router();
const { getPlayers, createPlayer } = require('../controllers/players.controllers');
const { validateCreatePlayer, validateGetPlayer } = require('../validators/players.validators');


//get all players
playerRoutes.get('/', validateGetPlayer, getPlayers);

//create player
playerRoutes.post('/', validateCreatePlayer, createPlayer);

module.exports = playerRoutes;
const AuthRoutes = require('express').Router();
const AuthValidators = require('../validators/auth.validators');
const login = require('../controllers/auth.controllers');

AuthRoutes.post('/login', AuthValidators.validateLogin, login);

module.exports = AuthRoutes;
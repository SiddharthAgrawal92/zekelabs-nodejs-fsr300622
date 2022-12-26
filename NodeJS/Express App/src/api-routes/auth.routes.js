const AuthRoutes = require('express').Router();
const AuthValidators = require('../validators/auth.validators');
const { login, refresh } = require('../controllers/auth.controllers');
const verifyToken = require('../middleware/auth.middleware');

AuthRoutes.post('/login', AuthValidators.validateLogin, login);

AuthRoutes.get('/refresh', verifyToken, refresh);

module.exports = AuthRoutes;
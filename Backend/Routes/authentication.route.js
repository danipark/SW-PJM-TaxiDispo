const express = require('express');
const routes = express.Router();
var userController = require('../Authentication/controller/user-controller');
var passport = require('passport');

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.get('/get-user/:id', userController.getUser)
routes.put('/update-user/:id', userController.updateUser)
module.exports = routes;
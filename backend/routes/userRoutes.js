const express = require('express');
const { userRegistration } = require('../controllers/userController')
const { userLogin } = require('../controllers/userController')

const route = express.Router();

route.route('/').post(userRegistration)
route.post('/login', userLogin)

module.exports = route;
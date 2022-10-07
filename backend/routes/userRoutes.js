const express = require('express');
const { userRegistration } = require('../controllers/userController')

const route = express.Router();

route.route('/').post(userRegistration)
// route.post('/login', loginUser)

module.exports = route;
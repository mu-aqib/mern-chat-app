const express = require('express');
const { userRegistration , userLogin , getAllUsers } = require('../controllers/userController')

const route = express.Router();

route.route('/').post(userRegistration).get(getAllUsers)
route.post('/login', userLogin)

module.exports = route;
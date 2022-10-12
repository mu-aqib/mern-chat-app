const express = require('express');
const { userRegistration , userLogin , getAllUsers } = require('../controllers/userController')
const  {isUser}  = require('../middleware/authMiddleware');

const route = express.Router();

route.route('/').post(userRegistration).get(isUser, getAllUsers)
route.post('/login', userLogin)

module.exports = route;
const express = require('express');
const { userRegistration , userLogin , getAllUsers } = require('../controllers/userController')
const  {isUserAuhtentic}  = require('../middleware/authMiddleware');

const route = express.Router();

route.route('/').post(userRegistration).get(isUserAuhtentic, getAllUsers)
route.post('/login', userLogin)

module.exports = route;
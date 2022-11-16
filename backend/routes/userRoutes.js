const express = require('express');
const { userRegistration , userLogin , getAllUsers, uploadCloudinaryFile } = require('../controllers/userController')
const  {isUserAuhtentic}  = require('../middleware/authMiddleware');

const route = express.Router();

route.route('/').post(userRegistration).get(isUserAuhtentic, getAllUsers)
route.post('/login', userLogin)
route.route('/cloud').post(uploadCloudinaryFile);

module.exports = route;

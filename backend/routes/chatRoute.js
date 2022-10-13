const express = require('express');
const  { isUser }  = require('../middleware/authMiddleware');

const router = express.Router()

// router.route('/').post(isUser, createChat);
// router.route('/').get(isUser, fetchChat);
// router.route('/group').post(isUser, creatGroupChat);
// router.route('/rename').put(isUser, renameGroup);
// router.route('/removeGroup').put(isUser, removeFromGroup);

module.exports = router;
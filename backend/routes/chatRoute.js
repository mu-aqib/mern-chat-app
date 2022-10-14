const express = require('express');
const  { isUserAuhtentic }  = require('../middleware/authMiddleware');

const router = express.Router()

router.route('/').post(isUserAuhtentic, createChat);
// router.route('/').get(isUserAuhtentic, fetchChat);
// router.route('/group').post(isUserAuhtentic, creatGroupChat);
// router.route('/rename').put(isUserAuhtentic, renameGroup);
// router.route('/removeGroup').put(isUserAuhtentic, removeFromGroup);

module.exports = router;
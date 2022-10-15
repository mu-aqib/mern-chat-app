const express = require('express');
const  { isUserAuhtentic }  = require('../middleware/authMiddleware');
const { createChat, fetchChats, creatGroupChat, renameGroup, removeUserFromGroup }  = require('../controllers/chatControllers')

const router = express.Router()

router.route('/').post(isUserAuhtentic, createChat);
router.route('/').get(isUserAuhtentic, fetchChats);
router.route('/group').post(isUserAuhtentic, creatGroupChat);
router.route('/rename').put(isUserAuhtentic, renameGroup);
router.route('/remove_user').put(isUserAuhtentic, removeUserFromGroup);

module.exports = router;
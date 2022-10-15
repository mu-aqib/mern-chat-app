const express = require('express');
const  { isUserAuhtentic }  = require('../middleware/authMiddleware');
const { createChat, fetchChats, creatGroupChat, renameGroup, removeUserFromGroup, addUserToGroup }  = require('../controllers/chatControllers')

const router = express.Router()

router.route('/').post(isUserAuhtentic, createChat);
router.route('/').get(isUserAuhtentic, fetchChats);
router.route('/group').post(isUserAuhtentic, creatGroupChat);
router.route('/rename').put(isUserAuhtentic, renameGroup);
router.route('/remove_user').put(isUserAuhtentic, removeUserFromGroup);
router.route('/add_user').put(isUserAuhtentic, addUserToGroup);

module.exports = router;
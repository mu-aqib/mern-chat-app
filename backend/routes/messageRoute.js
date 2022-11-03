const express = require('express');
const  { isUserAuhtentic }  = require('../middleware/authMiddleware');
const { creatMessage } = require('../controllers/messageController') ;

const router = express.Router()

router.route('/').post(isUserAuhtentic, creatMessage);
// router.router('/:chatId').get(isUserAuhtentic, allMessages);

module.exports = router;
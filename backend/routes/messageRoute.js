const express = require('express');
const  { isUserAuhtentic }  = require('../middleware/authMiddleware');
const { creatMessage } = require('') ;

const router = express.Router()

// router.router('/').post(isUserAuhtentic, creatMessage);
// router.router('/:chatId').get(isUserAuhtentic, allMessages);

module.exports = router;
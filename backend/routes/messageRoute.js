const express = require('express');
const  { isUserAuhtentic }  = require('../middleware/authMiddleware');
const { creatMessage, allMessagesByUser } = require('../controllers/messageController') ;

const router = express.Router()

router.route('/').post(isUserAuhtentic, creatMessage);
router.route('/:chatId').get(isUserAuhtentic, allMessagesByUser);

module.exports = router;
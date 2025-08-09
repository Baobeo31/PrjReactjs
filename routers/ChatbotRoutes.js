const express = require('express')
const router = express.Router()
const handleAskChatbot = require('../controllers/chatbotController')

router.post('/', handleAskChatbot)

module.exports = router
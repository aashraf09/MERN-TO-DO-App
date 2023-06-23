const express = require('express')
const router = express.Router()
const userData = require('../controllers/userData')

router.post('/', userData.handleUserData)

module.exports = router
const express = require('express')
const router = express.Router();
const authController = require('../controller/authController')
router.post('/', authController.login)

router.post('/refresh-token', authController.refreshToken)
router.post('/logout', authController.logout)
module.exports = router
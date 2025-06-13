const express = require('express')
const router = express.Router();
const authenticate = require('../middleWare/authenticate')
const socialLinksController = require('../controller/socialLinksController')
router.post('/', authenticate, socialLinksController.addsocialLinks)
router.get('/', socialLinksController.getSocialLinks)
router.get('/:socialLinksId', socialLinksController.getSocialLinksById)
router.put('/:socialLinksId',authenticate,  socialLinksController.updateSocialLinks)
router.delete('/:socialLinksId', authenticate, socialLinksController.deletSocialLinks)

module.exports = router
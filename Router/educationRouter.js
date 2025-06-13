const express = require('express')
const router = express.Router();
const educationController = require('../controller/educationController')
const authenticate = require('../middleWare/authenticate')

router.post('/', authenticate, educationController.addEducation)

router.get('/', educationController.getEducation)
router.get('/:educationId', educationController.getAboutById)
router.put('/:educationId',authenticate,  educationController.updateEducation)
router.delete('/:educationId', authenticate, educationController.deletEducation)

module.exports = router
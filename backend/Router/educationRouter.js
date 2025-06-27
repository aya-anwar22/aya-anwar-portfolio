const express = require('express')
const router = express.Router();
const educationController = require('../controller/educationController')
const authenticate = require('../middleWare/authenticate')

router.post('/', educationController.addEducation)

router.get('/', educationController.getEducation)
router.get('/:educationId', educationController.getAboutById)
router.put('/:educationId',  educationController.updateEducation)
router.delete('/:educationId', educationController.deletEducation)

module.exports = router
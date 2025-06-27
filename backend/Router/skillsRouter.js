const express = require('express')
const router = express.Router();
const skillsController = require('../controller/skillsController')
const authenticate = require('../middleWare/authenticate')

router.post('/',authenticate, skillsController.addSkills)
router.get('/', skillsController.getSkills)
router.put('/:skillId', authenticate, skillsController.updateSkills)
router.delete('/:skillId', authenticate, skillsController.deletSkills)


module.exports = router
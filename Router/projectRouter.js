const express = require('express')
const router = express.Router();
const projectControllers = require('../controller/projectControllers')
const authenticate = require('../middleWare/authenticate')
const upload = require('../config/multerConfig');

router.post('/',authenticate, upload.single('image'), projectControllers.addProject)

router.get('/', projectControllers.getProject)
router.get('/:projectId', projectControllers.getProjectById)
router.put('/:projectId',authenticate, upload.single('image'), projectControllers.updateProject)
router.delete('/:projectId',authenticate, projectControllers.deletProject)

module.exports = router
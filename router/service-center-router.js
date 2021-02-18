const express = require('express')
const router = express.Router()

const servicCenterController = require('../controller/service-center-controller')
const userController = require('../controller/auth-controller')
const multer = require('../middleware/multer')
const Service = require('../middleware/auth/service-token')
const Auth = require('../middleware/user')

router.post('/signup', userController.createServiceCenter)
router.post('/login', userController.loginMechanic)

router.post('/add-data', servicCenterController.createServiceCenter)
router.patch('/pro-pic', multer, servicCenterController.addProfileImage)
router.get('/service-centers', servicCenterController.allServiceCnter)

router.delete('/delete-service-center/:id/:userId',
 servicCenterController.deleteServiceCnter)
router.get('/service-center/:id', servicCenterController.findOneServiceCenter)
router.patch('/update', servicCenterController.updateServiceCenter)

// services
router.post('/create-service', servicCenterController.createService)
router.get('/services', servicCenterController.getServices)
router.delete('/delete-service/:id', servicCenterController.deleteServices)

module.exports = router

const express = require('express')
const router = express.Router()

const servicCenterController = require('../controller/service-center-controller')
const userController = require('../controller/auth-controller')
const multer = require('../middleware/multer')
const Service = require('../middleware/auth/service-token')
const Auth = require('../middleware/user')

router.post('/signup', userController.createMechanic)
router.post('/login', userController.loginMechanic)

router.post('/add-data',[Auth, Service], servicCenterController.createServiceCenter)
router.patch('/pro-pic',[Auth, Service], multer, servicCenterController.addProfileImage)
router.get('/allserviceCenters',[Auth, Service], servicCenterController.allServiceCnter)

router.delete('/deleteservice-center',[Auth, Service],
 servicCenterController.deleteServiceCnter)
// router.get('/one-service',[Auth, Service], servicCenterController.findOneServiceCenter)
router.patch('/update',[Auth, Service], servicCenterController.updateServiceCenter)

// services
router.post('/create-service',[Auth, Service], servicCenterController.createService)
router.get('/services',[Auth, Service], servicCenterController.getServices)
router.delete('/delete-service/:id',[Auth, Service], servicCenterController.deleteServices)

module.exports = router

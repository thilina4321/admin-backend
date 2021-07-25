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
router.patch('/pro-pic/:id', servicCenterController.addProfileImage)
router.get('/service-centers', servicCenterController.allServiceCnter)
router.get('/centers', servicCenterController.allServiceCnter)


router.delete('/delete-service-center/:id/:userId',
 servicCenterController.deleteServiceCnter)
router.get('/service-center/:id', servicCenterController.findOneServiceCenter)
router.patch('/update/:id', servicCenterController.updateServiceCenter)

// appointments
router.get('/get-appointments/:centerId', servicCenterController.findAppointments)
router.patch('/change-status', servicCenterController.changeAppointmentStatuc)

// services
router.post('/create-service',multer, servicCenterController.createService)
router.get('/services/:centerId', servicCenterController.getServices)
router.delete('/delete-service/:id', servicCenterController.deleteServices)
router.patch('/edit-service/:id', servicCenterController.editService)

//appointments
router.get('/appointments/:centerId', servicCenterController.getAppointments)
router.get('/approve', servicCenterController.approveAppointment)

module.exports = router

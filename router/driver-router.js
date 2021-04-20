const express = require('express')
const router = express.Router()

const driverController = require('../controller/driver-controller')
const userController = require('../controller/auth-controller')
const Auth = require('../middleware/user')
const Driver = require('../middleware/auth/driver-token')
const multer = require('../middleware/multer')

// router
router.post('/signup', userController.createDriver)
router.post('/login', userController.loginDriver)

router.post('/add-data',  driverController.createDriver)
router.patch('/pro-pic',  multer, driverController.addProfileImage)
router.patch('/cover-pic', multer, driverController.addVehicleImage)

router.get('/driver/:id', driverController.driver)
router.patch('/update', driverController.updateDriver)
router.delete('/delete-driver/:id/:userId', driverController.deletedriver)

// ratings
router.post('/mechanic-rating',  driverController.mechanicRating)
router.get('/my-mechanic-rating/:id/:driverId',  driverController.driversRatingsForMechanic)
router.post('/spare-rating',  driverController.spareShopRating)
router.get('/my-spare-rating/:id/:driverId',  driverController.driversRatingsForSpareShop)
router.post('/service-rating',  driverController.serviceCenterRating)
router.get('/my-service-rating/:id/:driverId',  driverController.driversRatingsForServiceCenter)

// search nearest
router.get('/near-mechanic', driverController.findNeaarestMechanic)
router.get('/near-service', driverController.findNeaarestServiceCenter)
router.get('/near-spare', driverController.findNeaarestSpareShop)

router.post('/make-appointment', driverController.makeAppointment)
router.get('/find-appointments/:driverId', driverController.findAppointments)

module.exports = router

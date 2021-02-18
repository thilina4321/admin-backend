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

router.get('/driver/:id/:userId', driverController.driver)
router.patch('/update', driverController.updateDriver)
router.delete('/delete-driver/:id', driverController.deletedriver)

router.post('/mechanic-rating',  driverController.mechanicRating)
router.post('/spare-rating',  driverController.spareShopRating)
router.post('/service-rating',  driverController.serviceCenterRating)

// search nearest
router.get('/near-mechanic', driverController.findNeaarestMechanic)
router.get('/near-service', driverController.findNeaarestServiceCenter)
router.get('/near-spare', driverController.findNeaarestSpareShop)

module.exports = router

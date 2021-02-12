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
router.patch('/pro-pic', [Auth, Driver], multer, driverController.addProfileImage)
router.patch('/cover-pic', [Auth, Driver],multer, driverController.addVehicleImage)

router.get('/alldrivers',[Auth, Driver], driverController.allDrivers)
router.patch('/update',[Auth, Driver], driverController.updateDriver)
router.delete('/delete-driver',[Auth,Driver], driverController.deletedriver)

router.post('/mechanic-rating', [Auth,Driver], driverController.mechanicRating)
router.post('/spare-rating', [Auth,Driver], driverController.spareShopRating)
router.post('/service-rating', [Auth, Driver], driverController.serviceCenterRating)

// search nearest
router.post('/near-mechanic',[Auth,Driver], driverController.findNeaarestMechanic)
router.post('/near-service',[Auth,Driver], driverController.findNeaarestServiceCenter)
router.post('/near-spare',[Auth,Driver], driverController.findNeaarestSpareShop)

module.exports = router

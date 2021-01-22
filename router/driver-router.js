const express = require('express')
const router = express.Router()

const driverController = require('../controller/driver-controller')
const auth = require('../middleware/auth/driver-token')
const multer = require('../middleware/multer')

router.post('/add-data', multer, driverController.createDriver)
router.post('/login', driverController.loginDriver)
router.get('/alldrivers',auth, driverController.allDrivers)
router.get('/one-driver',auth, driverController.findOneDriver)
router.patch('/update',auth, driverController.updateDriver)
router.delete('/deletedriver',auth, driverController.deletedriver)

module.exports = router

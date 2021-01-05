const express = require('express')
const router = express.Router()

const driverController = require('../controller/driver-controller')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')

router.get('/alldrivers', driverController.allDrivers)
router.post('/createdriver', driverController.createDriver)
router.post('/add-data', multer, driverController.addDataToDriver)
router.delete('/deletedriver/:id', driverController.deletedriver)

module.exports = router

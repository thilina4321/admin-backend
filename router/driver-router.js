const express = require('express')
const router = express.Router()

const driverController = require('../controller/driver-controller')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer')

router.get('/alldrivers', driverController.allDrivers)
router.get('/one-driver/:id', driverController.findOneDriver)
router.patch('/update/:id', driverController.updateDriver)
router.post('/add-data', multer, driverController.addDataToDriver)
router.delete('/deletedriver/:id', driverController.deletedriver)

module.exports = router

const express = require('express')
const router = express.Router()

const servicCenterController = require('../controller/service-center-controller')
const multer = require('../middleware/multer')

router.get('/allserviceCenters', servicCenterController.allServiceCnter)
router.post('/create-service', servicCenterController.createServiceCnter)
router.delete('/deleteservice-center/:id', servicCenterController.deleteServiceCnter)
router.post('/add-data', multer, servicCenterController.addDataToServiceCenter)


module.exports = router

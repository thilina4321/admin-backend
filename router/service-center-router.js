const express = require('express')
const router = express.Router()

const servicCenterController = require('../controller/service-center-controller')
const multer = require('../middleware/multer')
const auth = require('../middleware/auth/service-token')

router.post('/login', servicCenterController.loginServiceCenter)
router.post('/add-data', multer, servicCenterController.createServiceCenter)
router.get('/allserviceCenters',auth, servicCenterController.allServiceCnter)
router.delete('/deleteservice-center',auth, servicCenterController.deleteServiceCnter)
router.get('/one-service',auth, servicCenterController.findOneServiceCenter)
router.patch('/update',auth, servicCenterController.updateServiceCenter)


module.exports = router

const express = require('express')
const router = express.Router()

const mechanicController = require('../controller/mechanic-controller')
const multer = require('../middleware/multer')
const auth = require('../middleware/auth/mechanic-token')

router.post('/add-data', multer, mechanicController.createMechanic)
router.post('/login', mechanicController.loginMechanic)
router.get('/allmechanics',auth, mechanicController.allMechanics)
router.get('/one-mechanic',auth, mechanicController.findOneMechanic)
router.patch('/update',auth, mechanicController.updateMechanic)
router.delete('/deletemechanic',auth, mechanicController.deleteMechanic)



module.exports = router

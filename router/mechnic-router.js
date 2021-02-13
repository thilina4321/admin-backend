const express = require('express')
const router = express.Router()

const mechanicController = require('../controller/mechanic-controller')
const userController = require('../controller/auth-controller')
const multer = require('../middleware/multer')
const Mechanic = require('../middleware/auth/mechanic-token')
const Auth = require('../middleware/user')

router.post('/signup', userController.createMechanic)
router.post('/login', userController.loginMechanic)

router.post('/add-data', mechanicController.createMechanic)
router.patch('/pro-pic', multer, mechanicController.addProfileImage)

router.get('/mechanics', mechanicController.allMechanics)
router.get('/-mechanic', mechanicController.findOneMechanic)
router.patch('/update', mechanicController.updateMechanic)
router.delete('/delete-mechanic', mechanicController.deleteMechanic)



module.exports = router

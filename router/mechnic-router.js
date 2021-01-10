const express = require('express')
const router = express.Router()

const mechanicController = require('../controller/mechanic-controller')
const multer = require('../middleware/multer')

router.get('/allmechanics', mechanicController.allMechanics)
router.get('/one-mechanic/:id', mechanicController.findOneMechanic)
router.patch('/update/:id', mechanicController.updateMechanic)
router.post('/add-data', multer, mechanicController.addDataToMechanic)
router.delete('/deletemechanic/:id', mechanicController.deleteMechanic)



module.exports = router

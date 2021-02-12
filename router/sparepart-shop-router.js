const express = require('express')
const router = express.Router()

const sparepartShopController = require('../controller/sparepart-shop-controller')
const userController = require('../controller/auth-controller')
const multer = require('../middleware/multer')
const Auth = require('../middleware/user')
const SpareShop = require('../middleware/auth/spare-token')

router.post('/signup', userController.createSpareShop)
router.post('/login', userController.loginSpareShop)

router.post('/add-data', sparepartShopController.createSpareShop)
router.patch('/pro-pic',[Auth, SpareShop],multer, sparepartShopController.addProfileImage)
router.get('/shops',[Auth, SpareShop], sparepartShopController.allSpareshop)

router.delete('/delete-spareshop',[Auth, SpareShop], sparepartShopController.deleteSpareShop)
// router.get('/one-spareshop',[Auth, SpareShop], sparepartShopController.findOneSpareShop)
router.patch('/update',[Auth, SpareShop], sparepartShopController.updateSpareShop)

// spare parts
router.post('/create-spare',[Auth, SpareShop], sparepartShopController.createSparePrt)
router.get('/spares',[Auth, SpareShop], sparepartShopController.getSparePart)
router.delete('/delete-spare/:id',[Auth, SpareShop], sparepartShopController.deleteSparePart)

module.exports = router

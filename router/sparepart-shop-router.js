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
router.get('/shops', sparepartShopController.allSpareshop)

router.delete('/delete-spareshop/:id/:userId', sparepartShopController.deleteSpareShop)
router.get('/spare-shop/:id', sparepartShopController.findOneSpareShop)
router.patch('/update/:id', sparepartShopController.updateSpareShop)

// spare parts
router.post('/create-spare', sparepartShopController.createSparePrt)
router.get('/spares/:shopId', sparepartShopController.getSparePart)
router.patch('/edit-spares/:id', sparepartShopController.editSparePart)
router.delete('/delete-spare/:id', sparepartShopController.deleteSparePart)

module.exports = router

const express = require('express')
const router = express.Router()

const sparepartShopController = require('../controller/sparepart-shop-controller')
const multer = require('../middleware/multer')
const auth = require('../middleware/auth/spare-token')

router.post('/add-data', multer, sparepartShopController.createSpareShoo)
router.post('/login', sparepartShopController.loginSpareShop)
router.get('/allsparepartShops', sparepartShopController.allSpareshop)
router.delete('/delete-spareshop',auth, sparepartShopController.deleteSpareShop)
router.get('/one-spareshop',auth, sparepartShopController.findOneSpareShop)
router.patch('/update',auth, sparepartShopController.updateSpareShop)

module.exports = router

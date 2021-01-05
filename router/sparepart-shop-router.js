const express = require('express')
const router = express.Router()

const sparepartShopController = require('../controller/sparepart-shop-controller')
const multer = require('../middleware/multer')

router.get('/allsparepartShops', sparepartShopController.allSpareshop)
router.post('/create-spareshop', sparepartShopController.createServiceCnter)
router.delete('/delete-spareshop/:id', sparepartShopController.deleteSpareShop)
router.post('/add-data', multer, sparepartShopController.addDataToSpareshop)

module.exports = router

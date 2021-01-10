const express = require('express')
const router = express.Router()

const sparepartShopController = require('../controller/sparepart-shop-controller')
const multer = require('../middleware/multer')

router.get('/allsparepartShops', sparepartShopController.allSpareshop)
router.delete('/delete-spareshop/:id', sparepartShopController.deleteSpareShop)
router.post('/add-data', multer, sparepartShopController.addDataToSpareshop)
router.get('/one-spareshop/:id', sparepartShopController.findOneSpareShop)
router.patch('/update/:id', sparepartShopController.updateSpareShop)

module.exports = router

const express = require('express')
const router = express.Router()

const faqController = require('../controller/faq-controller')
const multer = require('../middleware/multer')

const authDriver = require('../middleware/auth/driver-token')
const authMechanic = require('../middleware/auth/mechanic-token')

router.post('/create',authDriver, multer, faqController.newQuestion)
router.delete('/delete/:id',authDriver, faqController.deleteFAQ)
router.post('/give-answer/:id',authMechanic, faqController.giveAnswer)
router.get('/answered',authDriver, faqController.answeredQuestions)
router.get('/not-answered',authMechanic, faqController.notAnsweredQuestions)


module.exports = router

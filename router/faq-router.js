const express = require('express')
const router = express.Router()

const faqController = require('../controller/faq-controller')
const multer = require('../middleware/multer')

const authDriver = require('../middleware/auth/driver-token')
const authMechanic = require('../middleware/auth/mechanic-token')
const Auth = require('../middleware/user')

router.post('/create',[Auth, authDriver], multer, faqController.newQuestion)
router.delete('/delete/:id',[Auth,authDriver], faqController.deleteFAQ)
router.post('/give-answer/:id',[Auth,authMechanic], faqController.giveAnswer)
router.get('/answered',[Auth, authDriver], faqController.answeredQuestions)
router.get('/not-answered',[Auth, authMechanic], faqController.notAnsweredQuestions)
router.get('/all', faqController.question)


module.exports = router

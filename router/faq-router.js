const express = require('express')
const router = express.Router()

const faqController = require('../controller/faq-controller')
const multer = require('../middleware/multer')

const authDriver = require('../middleware/auth/driver-token')
const authMechanic = require('../middleware/auth/mechanic-token')
const Auth = require('../middleware/user')

router.post('/create', multer, faqController.newQuestion)
router.delete('/delete/:id', faqController.deleteFAQ)

router.post('/give-answer', faqController.giveAnswer)
router.patch('/edit-answer/:id/:answerId', faqController.editAnswer)
router.delete('/delete-answer/:id/:answerId', faqController.deleteAnswer)

router.get('/questions', faqController.questions)
router.get('/not-answered', faqController.notAnsweredQuestions)
router.get('/all', faqController.question)


module.exports = router

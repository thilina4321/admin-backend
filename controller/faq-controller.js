const FAQ = require('../model/faq/faq-model')

exports.newQuestion = async(req,res)=>{
  const data = req.body
  const token = req.token
  let url;
  if(req.files){
    url = req.protocol + '://' + req.get('host') + '/images/' + req.files[0].filename
  }

  try {
    const question = await FAQ.create({
      question:data.question,
      questionImage:url,
      driver:req.driver._id
    })
    const savedQuestion = await question.save()

    res.status(201).send({savedQuestion, token})

  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.giveAnswer = async(req,res)=>{
  const id = req.params.id
  const mechanicId = req.mechanic._id
  const data = req.body
  console.log(data.answer);

  try {
    const findQuestion = await FAQ.findById(id)
    if(!findQuestion){
      return res.status(404).send('Can not find the question')
    }
    const answer = await findQuestion.provideAnswer(mechanicId, data.answer)
    // console.log('first');
    // const answeredQuestions = questions.filter(question=>question.answers.length > 0)
    // console.log('second');
    res.send(answer)


  } catch (error) {
    res.status(500).send(error.message)

  }
}

exports.answeredQuestions = async(req,res)=>{
  try {
    const questions = await FAQ.find()
    console.log(questions);
    const answeredQuestion = questions.filter(que=> que.answers.length != 0)
    res.send(answeredQuestion)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.notAnsweredQuestions = async(req,res)=>{
  try {
    const questions = await FAQ.find()
    const notansweredQuestion = questions.filter(que=> que.answers.length == 0)
    res.send(notansweredQuestion)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.deleteFAQ = async(req,res)=>{
  const id = req.params.id

  try {
    const question = await FAQ.findByIdAndDelete(id)
    res.send(question)
  } catch (error) {
    res.status(500).send(error.message)
  }

}


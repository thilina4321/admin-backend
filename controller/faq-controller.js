const FAQ = require('../model/faq/faq-model')

exports.newQuestion = async(req,res)=>{
  const data = req.body
  const token = req.token
  let url;
  if(req.file){
    url = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
  }

  try {
    const question = await FAQ.create({
      question:data.question,
      questionImage:url,
      driverField:req.user
    })
    const savedQuestion = await question.save()

    res.status(201).send({savedQuestion, token})

  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.question = async(req,res)=>{

  try {
    const questions = await FAQ.find()
    res.send(questions)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.giveAnswer = async(req,res)=>{
  const id = req.params.id
  const mechanicId = req.user
  const data = req.body
  console.log(data.answer);

  try {
    const findQuestion = await FAQ.findById(id)
    if(!findQuestion){
      return res.status(404).send('Can not find the question')
    }
    const answer = await findQuestion.provideAnswer(mechanicId, data.answer)

    res.send(answer)


  } catch (error) {
    res.status(500).send(error.message)

  }
}

exports.answeredQuestions = async(req,res)=>{
  if(req.error){
    return res.status(422).send({error:req.error})
  }

  try {
    const answeredQuestion =  await FAQ.$where('this.answers.length == 0')
    const a = await FAQ.find().populate({path:'driverField'})
    console.log(a);

    res.send(answeredQuestion)

  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.notAnsweredQuestions = async(req,res)=>{
  if(req.error){
    return res.status(422).send({error:req.error})
  }
  try {
    const notansweredQuestion = await await FAQ.$where('this.answers.length == 0')
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


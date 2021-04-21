const FAQ = require('../model/faq/faq-model')

exports.newQuestion = async(req,res)=>{
  const data = req.body
  const token = req.token
  let url;
  if(req.file){
    url = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
  }

  try {
    const question = new FAQ({
      question:data.question,
      questionImage:url,
      driverId:data.driverId
    })
    const savedQuestion = await question.save()

    res.status(201).send({savedQuestion, token})

  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.question = async(req,res)=>{

  try {
    const questions = await FAQ.find().populate('answers.authorId driverId')

    res.send(questions)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.giveAnswer = async(req,res)=>{
  const {questionId, authorId, answer} = req.body

  try {
    const findQuestion = await FAQ.findById(questionId)
    if(!findQuestion){
      return res.status(404).send('Can not find the question')
    }
    const {newAnswer, error} = await findQuestion.provideAnswer(authorId, answer)
    if(error){
      return res.status(500).send({error})
    }

    res.send({answer:newAnswer})


  } catch (error) {
    res.status(500).send(error.message)

  }
}

exports.editAnswer = async(req,res)=>{
  const {id,answerId } = req.params
  const {answer} = req.body

  try {
    const findQuestion = await FAQ.findById(id)
    if(!findQuestion){
      return res.status(404).send('Can not find the question')
    }
    console.log(findQuestion.answers);
    const filtered =  findQuestion.answers.find(element => element._id == answerId);

    filtered.answer = answer
    await filtered.save()
    console.log(filtered);

    res.status(200).send({filtered})
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

exports.deleteAnswer = async(req,res)=>{
  const {questionId, answerId} = req.params

  try {
    const findQuestion = await FAQ.findById(questionId)
    if(!findQuestion){
      return res.status(404).send({message:'Can not find the question'})
    }

    console.log(findQuestion.answers);
    const filtered =  findQuestion.answers.filter(element => element._id != answerId);

    console.log(filtered);
    await filtered.save()

    res.status(200).send({filtered})


  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

exports.questions = async(req,res)=>{
  if(req.error){
    return res.status(422).send({error:req.error})
  }

  try {
    const fetchquiz =  await FAQ.find().populate('driverId answers.authorId')
    res.send({fetchquiz})

  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.notAnsweredQuestions = async(req,res)=>{
  if(req.error){
    return res.status(422).send({error:req.error})
  }
  try {
    const fetchquiz =  await FAQ.find()
    let notansweredQuestion = fetchquiz.answers.length == 0
    res.send({notansweredQuestion})
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


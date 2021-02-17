const UserType = require('../enum/userType')
const signupHelper = require('../helper/signup-helper')
const loginHelper = require('../helper/login-helper')

exports.createDriver = async(req,res)=>{
  const data = req.body

  try {
    const {savedUser, error} = await signupHelper.signupUser(data, UserType.DRIVER)

    if(error){
      return res.status(500).send({error})
    }
    res.send({message:'Account successfully created', userId:savedUser})
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

exports.loginDriver = async(req,res)=>{
  const data = req.body
  try {
    const {user, token, error} = await loginHelper.loginHelper(data)
    if(error){
      return res.status(422).send({error})
    }
    res.send({user,token})
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.createMechanic = async(req,res)=>{
  const data = req.body

  try {
    const {savedUser, error} = await signupHelper.signupUser(data, UserType.MECHANIC)

    if(error){
      return res.status(500).send({error})
    }
    res.send({message:'Account successfully created', userId:savedUser})
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message)
  }
}

exports.loginMechanic = async(req,res)=>{
  const data = req.body
  try {
    const {user, token, error} = await loginHelper.loginHelper(data)
    if(error){
      return res.status(422).send({error})
    }
    res.send({user,token})
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.createSpareShop = async(req,res)=>{
  const data = req.body

  try {
    const {savedUser, error} = await signupHelper.signupUser(data, UserType.SPARE_PART_SHOP)

    if(error){
      return res.status(500).send({error})
    }
    res.send({message:'Account successfully created', user:savedUser})
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.loginSpareShop = async(req,res)=>{
  const data = req.body
  try {
    const {user, token, error} = await loginHelper.loginHelper(data)
    if(error){
      return res.status(422).send({error})
    }
    res.send({user,token})
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.createServiceCenter = async(req,res)=>{
  const data = req.body

  try {
    const {savedUser, error} = await signupHelper.signupUser(data, UserType.SERVICE_CENTER)

    if(error){
      return res.status(500).send({error})
    }
    res.send({message:'Account successfully created', userId:savedUser})
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.loginServiceCenter = async(req,res)=>{
  const data = req.body
  try {
    const {user, token, error} = await loginHelper.loginHelper(data)
    if(error){
      return res.status(422).send({error})
    }
    res.send({user,token})
  } catch (error) {
    res.status(500).send(error.message)
  }
}

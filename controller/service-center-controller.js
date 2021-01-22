const ServiceCenter = require('../model/service-center/service-center-model')
const bcrypt = require('bcryptjs')

exports.createServiceCenter = async (req, res) => {
  const data = req.body;
  let url ;

  if(req.files){

    url = req.protocol + "://" + req.get("host") + "/images/" + req.files[0].filename;
  }

  const { name, email,password, openTime, closeTime, mobile, address } = data;
  try {
    const hash = await bcrypt.hash(password, 8);
    console.log(url);

    const serviceCenterData = new ServiceCenter({
      email,
      password:hash,
      name,
      mobile,
      openTime,
      closeTime,
      address,
      image: url,
    });
    const serviceCenter = await serviceCenterData.save();
    const token = await serviceCenter.generateToken()
    return res.status(201).send({ serviceCenter, token});
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.loginServiceCenter = async (req,res)=>{
  const data = req.body
  try {
    const serviceCenter = await ServiceCenter.loginWithEmailAndPassword(data)
    const token = await serviceCenter.generateToken()
    return res.send({serviceCenter, token})
  } catch (error) {
    res.status(400).send(error.message)
  }
}

exports.allServiceCnter = async(req,res)=>{
  try {
    const serviceCenter = await ServiceCenter.find()
    return res.status(200).send(serviceCenter)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}


  exports.findOneServiceCenter = async (req,res)=>{
    const id = req.serviceCenter

    try {
      const serviceCenter = await ServiceCenter.findById(id)
      if(!serviceCenter){
        res.status(404).send({message:'Service center not found'})
      }
      res.status(200).send(serviceCenter)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }



exports.deleteServiceCnter = async(req,res)=>{
  const id = req.serviceCenter
  try {
    const serviceCenter = await ServiceCenter.findByIdAndDelete(id)
    if(!serviceCenter){
      return res.status(404).send('can not find the user')
    }
    return res.status(200).send(serviceCenter)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}

exports.updateServiceCenter = async(req,res)=>{
  let data = req.body
  const id = req.serviceCenter

  try {
    const updatedServiceCenter = await ServiceCenter.findByIdAndUpdate(id, data, {new:true, runValidators:true})
    res.send(updatedServiceCenter)

  } catch (error) {
    res.status(404).send('User cant find')
  }
}

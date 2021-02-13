const ServiceCenter = require('../model/service-center/service-center-model')
const Service = require('../model/service-center/service-model')
const addImageHelper = require('../helper/image-helper')


exports.createServiceCenter = async (req, res) => {
  const data = req.body;
  const token = req.token
  const user = req.user

  try {

    const serviceCenterData = new ServiceCenter({...data,user });
    const serviceCenter = await serviceCenterData.save();

    return res.status(201).send({ serviceCenter, token});
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.addProfileImage = async (req, res) => {
  const token = req.token;
  const user = req.user;

  profileImage =
    req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
  try {
    const {image,error} = await addImageHelper.addImage(ServiceCenter,user, profileImage);
    if (error) {
      return res.status(500).send({ error });
    }
    res.send({ profileImage, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.allServiceCnter = async(req,res)=>{
  try {
    const serviceCenter = await ServiceCenter.find()
    return res.status(200).send(serviceCenter)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}


  exports.findOneServiceCenter = async (req,res)=>{
    const id = req.params.id


    try {
      const serviceCenter = await ServiceCenter.findById(id)
      if(!serviceCenter){
        res.status(404).send({message:'Service center not found'})
      }
      res.status(200).send({serviceCenter})
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
  const user = req.user

  try {
    const updatedServiceCenter = await ServiceCenter.findOneAndUpdate({user}, {...data}, {new:true, runValidators:true})
    res.send(updatedServiceCenter)

  } catch (error) {
    res.status(404).send('User cant find')
  }
}


exports.createService = async(req,res)=>{
  const data = req.body
  const user = req.user

  try {
    const service = new Service({...data, serviceCenter:user})
    const savedService = await service.save()

    res.send(savedService)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.getServices = async(req,res)=>{
  try {
    const services = await Service.find()
    res.send(services)
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

exports.deleteServices = async(req,res)=>{
  const id = req.params.id
  try {
    await Service.findByIdAndDelete(id)

    res.send({message:'Deleted service successfully'})
  } catch (error) {
    req.status(500).send({error:error.message})
  }
}

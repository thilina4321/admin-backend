const ServiceCenter = require('../model/service-center/service-center-model')
const Service = require('../model/service-center/service-model')
const addImageHelper = require('../helper/image-helper')
const User = require('../model/Auth-model')
const Appointment = require('../model/appointment')

exports.createServiceCenter = async (req, res) => {
  const data = req.body;
  const token = req.token
  const user = req.user

  try {

    const serviceCenterData = new ServiceCenter({...data });
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
      const serviceCenter = await ServiceCenter.findOne({userId:id})
      if(!serviceCenter){
        res.status(404).send({message:'Service center not found'})
      }
      res.status(200).send({serviceCenter})
    } catch (error) {
      res.status(500).send(error.message)
    }
  }



exports.deleteServiceCnter = async(req,res)=>{
  const id = req.params.id
  const userId = req.params.userId;
  try {


    const service = await ServiceCenter.findOneAndDelete(id)
    const user = await User.findByIdAndDelete(userId)

    return res.status(200).send({message:"User delete successfully"});
  } catch (e) {
    return res.status(500).send({error:e.message})
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

  try {
    const service = new Service({
      name:data.name,
      price:data.price,
      description:data.description,
      shopId:data.shopId
    })
    const savedService = await service.save()

    res.send({service:savedService})
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

exports.getServices = async(req,res)=>{
  const shopId = req.params.centerId
  try {
    const services = await Service.find({ shopId})
    if(!services){
      return res.status(404).send({error:"No service found"})
    }
    res.send({services})
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


exports.editService = async(req,res)=>{
  const id = req.params.id
  const data = req.body
  try {
    await Service.findByIdAndUpdate(id, {...data}, {new:true})
    res.send({message:'Updated service successfully'})
  } catch (error) {
    req.status(500).send({error:error.message})
  }
}


exports.getAppointments = async(req,res)=>{
  const {centerId} = req.params
  try {
    const appointment = await Appointment.find({centerId})

    res.status(201).send({appointment})
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

exports.approveAppointment = async(req,res)=>{
  const {status, id} = req.body
  try {
    const appointment = await Appointment.findByIdAndUpdate(id, {status}, {new:true})
    if(!appointment){
      res.status(404).send({message:'No Appointment found'})
    }

    res.status(200).send({appointment})

  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

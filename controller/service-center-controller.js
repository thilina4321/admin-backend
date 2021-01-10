const NewServiceCenter = require('../model/service-center/service-center-create')
const ServiceCenter = require('../model/service-center/service-center-model')
const bcrypt = require('bcryptjs')

exports.allServiceCnter = async(req,res)=>{
  try {
    const serviceCenter = await ServiceCenter.find()
    return res.status(200).send(serviceCenter)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}



  exports.addDataToServiceCenter = async (req, res) => {
    const data = req.body;
    const image = req.file;
    const url =
      req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;

    console.log(data);
    const { name, email,password, openTime, closeTime, mobile, address } = data;
    try {
      const hash = await bcrypt.hash(password, 8);

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
      await serviceCenterData.save();
      return res.status(200).send({ message: "Data added correctly" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


  exports.findOneServiceCenter = async (req,res)=>{
    const id = req.params.id

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
  const id = req.params.id
  console.log(id);
  try {
    const serviceCenter = await ServiceCenter.findByIdAndDelete(id)
    return res.status(200).send(serviceCenter)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}

exports.updateServiceCenter = async(req,res)=>{
  let data = req.body
  const id = req.params.id
  try {



    const updatedServiceCenter = await ServiceCenter.findByIdAndUpdate(id, data, {new:true, runValidators:true})
    res.send(updatedServiceCenter)

  } catch (error) {
    res.status(404).send('User cant find')
  }
}

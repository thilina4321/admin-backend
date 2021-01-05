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

exports.createServiceCnter = async(req,res)=>{
    const data = req.body;
    console.log(data);
    try {
      const hash = await bcrypt.hash(data.password, 8);
      const serviceCenterModel = new NewServiceCenter({ email: data.email,
         password: hash });
      const serviceCenter = await serviceCenterModel.save();

      return res.status(201).send(serviceCenter);
    } catch (error) {
      return res.status(403).send(error.message);
    }
  };

  exports.addDataToServiceCenter = async (req, res) => {
    const data = req.body;
    const image = req.file;
    const url =
      req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
    // console.log(url);

    console.log(data);
    const { name, email, nic, openTime, closeTime, mobile, address } = data;
    try {
      const serviceCenterData = new ServiceCenter({
        email,
        name,
        nic,
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



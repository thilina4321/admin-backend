const Driver = require("../model/driver/driver-model");
const bcrypt = require("bcryptjs");

exports.createDriver = async (req, res) => {
  const data = req.body;
  let profileImage;
  let vehicleImage;

  if(req.files){
    profileImage = req.protocol + "://" + req.get("host") + "/images/" + req.files[0].filename
    vehicleImage = req.protocol + "://" + req.get("host") + "/images/" + req.files[1].filename

  }

  console.log(profileImage);
  console.log(vehicleImage);

  const { name, email,password, nic, longitude, latitude,
    vehicleColor, vehicleNumber,userType, mobile } = data;
  try {
    const hash = await bcrypt.hash(password, 8);

    const driverData = new Driver({
      email,
      name,
      password:hash,
      nic,
      mobile,
      vehicleNumber,
      vehicleColor,
      userType,
      vehicleImage,
      profileImage,
      longitude,
      latitude,
    });

    const driver = await driverData.save();
    const token = await driver.generateToken()


    return res.status(201).send({driver, token});
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.loginDriver = async(req,res)=>{
  const data = req.body

  try {
    const driver = await Driver.loginWithEmailAndPassword(data)
    const token = await driver.generateToken()
    return res.send({driver, token})

  } catch (error) {
    return res.status(404).send({message:error.message})
  }
}


exports.allDrivers = async (req, res) => {
  const token = req.token
  try {
    const drivers = await Driver.find()
    return res.status(200).send({drivers, token});
  } catch (e) {
    return res.status(500).send(e.message);
  }
};


exports.findOneDriver = async (req,res)=>{
  const id = req.driver
  const token = req.token
  try {
    const driver = await Driver.findById(id)
    if(!driver){
      return res.status(404).send({message:'Driver not found'})
    }
    res.status(200).send({driver, token})
  } catch (error) {
    res.status(500).send(error.message)
  }
}


exports.deletedriver = async (req, res) => {
  const id = req.driver;
  try {
    const driver = await Driver.findByIdAndDelete(id);
    return res.status(200).send({message:'Deleted successfully'});
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

exports.updateDriver = async(req,res)=>{
  let data = req.body
  console.log(data);
  const id = req.driver
  console.log(id);
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(id, data, {new:true, runValidators:true})
    res.send(updatedDriver)

  } catch (error) {
    res.status(404).send('User cant find')
  }
}

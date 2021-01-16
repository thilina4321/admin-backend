const Driver = require("../model/driver/driver-model");
const bcrypt = require("bcryptjs");

exports.allDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find()
    return res.status(200).send(drivers);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

exports.addDataToDriver = async (req, res) => {
  const data = req.body;
  const image = req.file;


  const url =
    req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;

  const { name, email,password, nic, vehicleColor, vehicleNumber, mobile } = data;
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
      image: url,
    });
    await driverData.save();
    return res.status(200).send({ message: "Data added correctly" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.findOneDriver = async (req,res)=>{
  const id = req.params.id

  try {
    const driver = await Driver.findById(id)
    if(!driver){
      res.status(404).send({message:'Driver not found'})
    }
    res.status(200).send(driver)
  } catch (error) {
    res.status(500).send(error.message)
  }
}


exports.deletedriver = async (req, res) => {
  const id = req.params.id;
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
  const id = req.params.id
  console.log(id);
  try {



    const updatedDriver = await Driver.findByIdAndUpdate(id, data, {new:true, runValidators:true})
    res.send(updatedDriver)

  } catch (error) {
    res.status(404).send('User cant find')
  }
}

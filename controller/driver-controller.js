const Driver = require("../model/driver/driver-model");
const NewDriver = require("../model/driver/driver-create");
const bcrypt = require("bcryptjs");

exports.allDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    return res.status(200).send(drivers);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

exports.createDriver = async (req, res) => {
  const data = req.body;
  try {
    const hash = await bcrypt.hash(data.password, 8);
    const driverModel = new NewDriver({ email: data.email,
       password: hash });
    const driver = await driverModel.save();

    return res.status(201).send(driver);
  } catch (error) {
    return res.status(403).send(error.message);
  }
};

exports.addDataToDriver = async (req, res) => {
  const data = req.body;
  const image = req.file;
  const url =
    req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
  // console.log(url);

  console.log(data);
  const { name, email, nic, vehicleColor, vehicleNumber, mobile } = data;
  try {
    const driverData = new Driver({
      email,
      name,
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



exports.deletedriver = async (req, res) => {
  const id = req.params.id;
  try {
    const driver = await Driver.findByIdAndDelete(id);
    return res.status(200).send({message:'Deleted successfully'});
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

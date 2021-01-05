const bcrypt = require('bcryptjs')
const Mechanic = require('../model/mechanic/mechanic-model')
const NewMechanic = require('../model/mechanic/mechanic-create')

exports.allMechanics = async(req,res)=>{
  try {
    const mechanics = await Mechanic.find()
    return res.status(200).send(mechanics)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}

exports.createMechanic = async (req, res) => {
  const data = req.body;
  try {
    const hash = await bcrypt.hash(data.password, 8);
    console.log(data);
    const mechanicModel = new NewMechanic({ email: data.email,
       password: hash });
    const mechanic = await mechanicModel.save();

    return res.status(201).send(mechanic);
  } catch (error) {
    return res.status(403).send(error.message);
  }
};

exports.addDataToMechanic = async (req, res) => {
  const data = req.body;
  const image = req.file;
  const url =
    req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
  // console.log(url);

  console.log(data);
  const { name, email, nic, address, about, mobile } = data;
  try {
    const mechanicData = new Mechanic({
      email,
      name,
      nic,
      mobile,
      address,
      about,
      image: url,
    });
    await mechanicData.save();
    return res.status(200).send({ message: "Data added correctly" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};




exports.deleteMechanic = async(req,res)=>{
  const id = req.params.id
  try {
    const mechanic = await Mechanic.findByIdAndDelete(id)
    return res.status(200).send(mechanic)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}


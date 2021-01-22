const bcrypt = require("bcryptjs");
const Mechanic = require("../model/mechanic/mechanic-model");

exports.createMechanic = async (req, res) => {
  const data = req.body;
  const image = req.file;

  let url

  if(req.files){
    url = req.protocol + "://" + req.get("host") + "/images/" + req.file[0].filename;

  }

  const { name, email, nic, address, about, mobile,userType } = data;
  try {
    const hash = await bcrypt.hash(data.password, 8);
    const mechanicData = new Mechanic({
      email,
      password:hash,
      name,
      nic,
      userType,
      mobile,
      address,
      about,
      image: url,
    });
    const mechanic = await mechanicData.save();
    const token = await mechanic.generateToken()
    return res.status(201).send({mechanic, token});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.loginMechanic = async (req,res)=>{
  const data = req.body
  try {
    const mechanic = await Mechanic.loginWithEmailAndPassword(data)
    const token = await mechanic.generateToken()
    return res.send({mechanic, token})
  } catch (error) {
    res.status(400).send(error.message)
  }
}

exports.allMechanics = async (req, res) => {
  try {
    const mechanics = await Mechanic.find();
    return res.status(200).send(mechanics);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

exports.findOneMechanic = async (req, res) => {
  const id = req.params.id;

  try {
    const mechanic = await Mechanic.findById(id);
    if (!mechanic) {
      res.status(404).send({ message: "Mechanic not found" });
    }
    res.status(200).send(mechanic);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteMechanic = async (req, res) => {
  const id = req.mechanic;
  try {
    const mechanic = await Mechanic.findByIdAndDelete(id);
    return res.status(200).send(mechanic);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

exports.updateMechanic = async(req,res)=>{
  let data = req.body
  const id = req.params.id

  try {

    const updatedMechanic = await Mechanic.findByIdAndUpdate(id, data, {new:true, runValidators:true})
    return res.send(updatedMechanic)

  } catch (error) {
    res.status(404).send('User cant find')
  }
}

const bcrypt = require("bcryptjs");
const Mechanic = require("../model/mechanic/mechanic-model");
const NewMechanic = require("../model/mechanic/mechanic-create");

exports.allMechanics = async (req, res) => {
  try {
    const mechanics = await Mechanic.find();
    return res.status(200).send(mechanics);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};



exports.addDataToMechanic = async (req, res) => {
  const data = req.body;
  const image = req.file;
  const url =
    req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
  // console.log(url);

  const { name, email, nic, address, about, mobile } = data;
  try {
    const hash = await bcrypt.hash(data.password, 8);
    const mechanicData = new Mechanic({
      email,
      password:hash,
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
  const id = req.params.id;
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

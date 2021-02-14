const Mechanic = require("../model/mechanic/mechanic-model");
const addImageHelper = require('../helper/image-helper')

exports.createMechanic = async (req, res) => {
  const data = req.body;
  const user = req.user
  const token = req.token
  try {
    const mechanicData = new Mechanic({...data});
    const mechanic = await mechanicData.save();

    return res.status(201).send({mechanic, token});
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.addProfileImage = async (req, res) => {
  const token = req.token;
  const user = req.user;

  profileImage =
    req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
  try {
    const {image, error} = await addImageHelper.addImage(Mechanic,user, profileImage);
    if (error) {
      return res.status(500).send({ error });
    }
    res.send({ profileImage, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};



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
    const mechanic = await Mechanic.findOne({mechanicId:id});
    if (!mechanic) {
      res.status(404).send({ message: "Mechanic not found" });
    }
    res.status(200).send({mechanic});
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
  const user = req.user
  console.log(data);
  console.log(user);

  try {

    const updatedMechanic = await Mechanic.findOneAndUpdate({user}, {...data},
       {new:true, runValidators:true})
    return res.send({mechanic:updatedMechanic})

  } catch (error) {

    res.status(404).send({error:error.message})
  }
}

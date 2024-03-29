const Mechanic = require("../model/mechanic/mechanic-model");
const addImageHelper = require('../helper/image-helper')
const User = require('../model/Auth-model')

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

exports.allMecs = async (req, res) => {
  try {
    const mechanics = await Mechanic.find();

    return res.status(200).send({ mechanics });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

exports.addProfileImage = async (req, res) => {
  const {profileImage} = req.body
    const {id} = req.params

    try {

        const img = await Mechanic.findOneAndUpdate({userId:id},
           {image:profileImage}, {new:true})
        res.status(200).send({img})
    } catch (error) {
        res.status(500).send({error:error.message})
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
    const mechanic = await Mechanic.findOne({userId:id});
    if (!mechanic) {
      res.status(404).send({ message: "Mechanic not found" });
    }
    res.status(200).send({mechanic});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteMechanic = async (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;

  try {

    const mechanic = await Mechanic.findOneAndDelete({mechanicId:id});
    const user = await User.findByIdAndDelete(userId)

    return res.status(200).send({message:"User delete successfully"});
  } catch (e) {
    return res.status(500).send({error:error.message});
  }
};

exports.updateMechanic = async(req,res)=>{
  let data = req.body
  const id = req.params.id

  try {

    await Mechanic.findOneAndUpdate(id, {...data},
       {new:true, runValidators:true})
    return res.status(200).send({'message':'Update succeed'})

  } catch (error) {

    res.status(404).send({error:error.message})
  }
}

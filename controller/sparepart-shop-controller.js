const SpareShop = require('../model/spareshop/sparepart-shop-model')
const SparePart = require('../model/spareshop/spare-part-model')
const addImageHelper = require('../helper/image-helper')
const User = require('../model/Auth-model')

exports.createSpareShop = async (req, res) => {
  const data = req.body;
  const token = req.token
  const user = req.user

  try {

    const spareData = new SpareShop({...data});
    const spareshop = await spareData.save();

    return res.status(201).send({ spareshop, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addProfileImage = async (req, res) => {
  const {profileImage} = req.body
    const {id} = req.params

    try {

        const img = await SparePart.findOneAndUpdate({userId:id},
           {image:profileImage}, {new:true})
        res.status(200).send({img})
    } catch (error) {
        res.status(500).send({error:error.message})
    }
};


exports.allSpareshop = async(req,res)=>{
  try {
    const spareshop = await SpareShop.find()
    return res.status(200).send(spareshop)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}

  exports.findOneSpareShop = async (req,res)=>{
    const id = req.params.id

    try {
      const spareshop = await SpareShop.findOne({userId:id})
      if(!spareshop){
        res.status(404).send({message:'Spare shop not found'})
      }
      res.status(200).send({spareshop})
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

exports.deleteSpareShop = async(req,res)=>{
  const id = req.params.id
  const userId = req.params.userId;
  try {


    const spare = await SpareShop.findByIdAndDelete(id)
    const user = await User.findByIdAndDelete(userId)

    return res.status(200).send({message:"User delete successfully"});
  } catch (e) {
    return res.status(500).send({error:e.message})
  }
}

exports.updateSpareShop = async(req,res)=>{
  let data = req.body
  const id = req.params.id
  try {

    await SpareShop.findOneAndUpdate({user}, {...data}, {new:true, runValidators:true})
    res.status(200).send({'message':'update succeed'})

  } catch (error) {
    console.log(error.message);
    res.status(404).send('User cant find')
  }
}


exports.createSparePrt = async(req,res)=>{
  const data = req.body
  try {
    const sparePart = new SparePart({...data})
    const savesSparePart = await sparePart.save()

    res.send({spareParts:savesSparePart})
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.getSparePart = async(req,res)=>{
  const shopId = req.params.shopId
  try {
    const spareParts = await SparePart.find({ shopId})
    if(!spareParts){
      return res.status(404).send({error:"No services found"})
    }
    res.status(200).send({spareParts})
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

exports.deleteSparePart = async(req,res)=>{
  const id = req.params.id
  try {
    await SparePart.findByIdAndDelete(id)

    res.send({message:'Deleted spare part successfully'})
  } catch (error) {
    req.status(500).send({error:error.message})
  }
}

exports.editSparePart = async(req,res)=>{
  const id = req.params.id
  const data = req.body
  try {
    await SparePart.findByIdAndUpdate(id, {...data}, {new:true})

    res.send({message:'Updated spare part successfully'})
  } catch (error) {
    req.status(500).send({error:error.message})
  }
}

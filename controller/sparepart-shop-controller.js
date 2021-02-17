const SpareShop = require('../model/spareshop/sparepart-shop-model')
const SparePart = require('../model/spareshop/spare-part-model')
const addImageHelper = require('../helper/image-helper')

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
  const token = req.token;
  const user = req.user;

  profileImage =
    req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
  try {
    const {image, error} = await addImageHelper.addImage(SpareShop ,user, profileImage);
    if (error) {
      return res.status(500).send({ error });
    }
    res.send({ profileImage, token });
  } catch (error) {
    res.status(500).send(error.message);
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
      const spareshop = await SpareShop.findOne({shopId:id})
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
  try {
    // const session = await mongoose.startSession()
    // session.startTransaction()

    const spare = await SpareShop.findByIdAndRemove({shopId:id})
    const user = await User.findById(id)

    if(!user){
      return res.status(404).send({error:'User is not found'});
    }

    if(!spare){
      return res.status(404).send({error:'User is not found'});
    }

    // session.commitTransaction()
    return res.status(200).send({message:"User delete successfully"});
  } catch (e) {
    return res.status(500).send({error:e.message})
  }
}

exports.updateSpareShop = async(req,res)=>{
  let data = req.body
  const user = req.user
  try {

    const updatedSpareShop = await SpareShop.findOneAndUpdate({user}, {...data}, {new:true, runValidators:true})
    res.send(updatedSpareShop)

  } catch (error) {
    console.log(error.message);
    res.status(404).send('User cant find')
  }
}


exports.createSparePrt = async(req,res)=>{
  const data = req.body
  const user = req.user
  try {
    const sparePart = new SparePart({...data})
    const savesSparePart = await sparePart.save()

    res.send({spareParts:savesSparePart})
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.getSparePart = async(req,res)=>{
  try {
    const spareParts = await SparePart.find()
    res.send({spareParts})
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

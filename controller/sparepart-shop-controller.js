const SpareShop = require('../model/spareshop/sparepart-shop-model')
const SparePart = require('../model/spareshop/spare-part-model')
const addImageHelper = require('../helper/image-helper')

exports.createSpareShop = async (req, res) => {
  const data = req.body;
  const token = req.token
  const user = req.user

  try {

    const spareData = new SpareShop({...data,user});
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

  // exports.findOneSpareShop = async (req,res)=>{
  //   const id = req.spare

  //   try {
  //     const spareshop = await SpareShop.findById(id)
  //     if(!spareshop){
  //       res.status(404).send({message:'Spare shop not found'})
  //     }
  //     res.status(200).send(spareshop)
  //   } catch (error) {
  //     res.status(500).send(error.message)
  //   }
  // }

exports.deleteSpareShop = async(req,res)=>{
  const id = req.spare
  try {
    const spareshop = await SpareShop.findByIdAndDelete(id)
    if(!spareshop){
      return res.status(404).send('use can not found')
    }
    return res.status(200).send(spareshop)
  } catch (e) {
    return res.status(500).send(e.message)
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
    const sparePart = new SparePart({...data, spareShop:user})
    const savesSparePart = await sparePart.save()

    res.send(savesSparePart)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

exports.getSparePart = async(req,res)=>{
  try {
    const spareParts = await SparePart.find()
    res.send(spareParts)
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

const SpareShop = require('../model/spareshop/sparepart-shop-model')
const bcrypt = require('bcryptjs')




exports.createSpareShoo = async (req, res) => {
  const data = req.body;
  let url

  if(req.files){

    url = req.protocol + "://" + req.get("host") + "/images/" + req.files[0].filename;
  }

  const { name, email, about,password, address, openTime, closeTime, mobile } = data;
  try {
    const hash = await bcrypt.hash(password, 8);

    const spareData = new SpareShop({
      email,
      password:hash,
      name,
      mobile,
      address,
      openTime,
      closeTime,
      about,
      image: url,
    });

    const spareshop = await spareData.save();
    const token = await spareshop.generateToken()
    return res.status(201).send({ spareshop, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.loginSpareShop = async (req,res)=>{
  const data = req.body
  try {
    const spareShop = await SpareShop.loginWithEmailAndPassword(data)
    const token = await spareShop.generateToken()

    return res.send({spareShop,token})
  } catch (error) {
    res.status(400).send(error.message)
  }
}


exports.allSpareshop = async(req,res)=>{
  try {
    const spareshop = await SpareShop.find()
    return res.status(200).send(spareshop)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}

  exports.findOneSpareShop = async (req,res)=>{
    const id = req.spare

    try {
      const spareshop = await SpareShop.findById(id)
      if(!spareshop){
        res.status(404).send({message:'Spare shop not found'})
      }
      res.status(200).send(spareshop)
    } catch (error) {
      res.status(500).send(error.message)
    }
  }

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
  const id = req.spare
  try {

    const updatedSpareShop = await SpareShop.findByIdAndUpdate(id, data, {new:true, runValidators:true})
    res.send(updatedSpareShop)

  } catch (error) {
    res.status(404).send('User cant find')
  }
}

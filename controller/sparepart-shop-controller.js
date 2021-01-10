const NewSpareShop = require('../model/spareshop/spare-shop-create')
const SpareShop = require('../model/spareshop/sparepart-shop-model')
const bcrypt = require('bcryptjs')


exports.allSpareshop = async(req,res)=>{
  try {
    const spareshop = await SpareShop.find()
    return res.status(200).send(spareshop)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}

  exports.createServiceCnter = async(req,res)=>{
    const data = req.body;
    try {
      const hash = await bcrypt.hash(data.password, 8);
      const spareShop = new NewSpareShop({ email: data.email,
         password: hash });
      const spareshop = await spareShop.save();

      return res.status(201).send(spareshop);
    } catch (error) {
      return res.status(403).send(error.message);
    }
  };

  exports.addDataToSpareshop = async (req, res) => {
    const data = req.body;
    const image = req.file;
    const url =
      req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;

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
      await spareData.save();
      return res.status(200).send({ message: "Data added correctly" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  exports.findOneSpareShop = async (req,res)=>{
    const id = req.params.id

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
  const id = req.params.id
  try {
    const spareshop = await SpareShop.findByIdAndDelete(id)
    return res.status(200).send(spareshop)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}

exports.updateSpareShop = async(req,res)=>{
  let data = req.body
  const id = req.params.id
  try {



    const updatedSpareShop = await SpareShop.findByIdAndUpdate(id, data, {new:true, runValidators:true})
    res.send(updatedSpareShop)

  } catch (error) {
    res.status(404).send('User cant find')
  }
}

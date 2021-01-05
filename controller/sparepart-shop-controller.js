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
    // console.log(url);

    console.log(data);
    const { name, email, about, address, openTime, closeTime, mobile } = data;
    try {
      const spareData = new SpareShop({
        email,
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






exports.deleteSpareShop = async(req,res)=>{
  const id = req.params.id
  try {
    const spareshop = await SpareShop.findByIdAndDelete(id)
    return res.status(200).send(spareshop)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}



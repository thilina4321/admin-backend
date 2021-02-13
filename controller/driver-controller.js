const Driver = require("../model/driver/driver-model");
const Mechanic = require("../model/mechanic/mechanic-model");
const ServiceCenter = require("../model/service-center/service-center-model");
const SpareShop = require("../model/spareshop/sparepart-shop-model");
const addImageHelper = require("../helper/image-helper");

exports.createDriver = async (req, res) => {
  const data = req.body;

  try {
    const driverData = new Driver({
      ...data,
      // driverId: req.user,
    });

    const driver = await driverData.save();
    const token = req.token;

    return res.status(201).send({ driver, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.addProfileImage = async (req, res) => {
  const token = req.token;
  const user = req.user;

  profileImage =
    req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
  try {
    const {image, error} = await addImageHelper.addImage(Driver,user, profileImage);
    if (error) {
      return res.status(500).send({ error });
    }
    res.send({ profileImage, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addVehicleImage = async (req, res) => {
  const token = req.token;
  const user = req.user;

  try {
    vehicleImage =
      req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;

    await Driver.findByIdAndUpdate(user, vehicleImage, {
      runValidators: true,
      new: true,
    });
    res.send({vehicleImage, token});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.driver = async (req, res) => {
  const token = req.token;
  const id = req.params.id
  try {
    const driver = await Driver.findOne({driverId:id});
    return res.status(200).send({ driver, token });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};


exports.deletedriver = async (req, res) => {
  const id = req.user;
  try {
    const driver = await Driver.findByIdAndDelete(id);
    return res.status(200).send({ message: "Deleted successfully" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

exports.updateDriver = async (req, res) => {
  let data = req.body;
  console.log(data);
  const id = req.user;
  console.log(id);
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    res.send(updatedDriver);
  } catch (error) {
    res.status(404).send("User cant find");
  }
};

exports.mechanicRating = async (req, res, next) => {
  const driver = req.user;
  const { rating, mechanicId } = req.body;

  try {
    const findSomeOneForRate = await Mechanic.findById(mechanicId);
    if (!findSomeOneForRate) {
      return res.send("Can not find Mechanic");
    }

    const findRatedOneOrNot = findSomeOneForRate.ratings.find(
      (rating) => rating.driverId.toString() == driver._id.toString()
    );

    if (findRatedOneOrNot) {
      findSomeOneForRate.totalRating += rating - findRatedOneOrNot.rating;
      findRatedOneOrNot.rating = rating;
      await findSomeOneForRate.save();
      return res.send(findSomeOneForRate);
    } else {
      findSomeOneForRate.ratings.push({ rating, driverId: driver._id });
      findSomeOneForRate.totalRating += rating;
      await findSomeOneForRate.save();
      return res.send(findSomeOneForRate);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.serviceCenterRating = async (req, res, next) => {
  const driver = req.user;
  const { rating, serviceCenterId } = req.body;

  try {
    const findSomeOneForRate = await ServiceCenter.findById(serviceCenterId);
    if (!findSomeOneForRate) {
      return res.send("Can not find Service Center");
    }

    const findRatedOneOrNot = findSomeOneForRate.ratings.find(
      (rating) => rating.driverId.toString() == driver._id.toString()
    );

    if (findRatedOneOrNot) {
      findSomeOneForRate.totalRating += rating - findRatedOneOrNot.rating;
      findRatedOneOrNot.rating = rating;
      await findSomeOneForRate.save();
      return res.send(findSomeOneForRate);
    } else {
      findSomeOneForRate.ratings.push({ rating, driverId: driver._id });
      findSomeOneForRate.totalRating += rating;
      await findSomeOneForRate.save();
      return res.send(findSomeOneForRate);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.spareShopRating = async (req, res, next) => {
  const driver = req.user;
  const { rating, spareShopId } = req.body;

  try {
    const findSomeOneForRate = await SpareShop.findById(spareShopId);
    if (!findSomeOneForRate) {
      return res.send("Can not find Spare part shop");
    }

    const findRatedOneOrNot = findSomeOneForRate.ratings.find(
      (rating) => rating.driverId.toString() == driver._id.toString()
    );

    if (findRatedOneOrNot) {
      findSomeOneForRate.totalRating += rating - findRatedOneOrNot.rating;
      findRatedOneOrNot.rating = rating;
      await findSomeOneForRate.save();
      return res.send(findSomeOneForRate);
    } else {
      findSomeOneForRate.ratings.push({ rating, driverId: driver._id });
      findSomeOneForRate.totalRating += rating;
      await findSomeOneForRate.save();
      return res.send(findSomeOneForRate);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};


exports.findNeaarestMechanic = async(req,res)=>{
  const {city} = req.body

  try {
    const mechanics = await Mechanic.find({city})
    res.send(mechanics)
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

exports.findNeaarestServiceCenter = async(req,res)=>{
  const {city} = req.body

  try {
    const serviceCenters = await ServiceCenter.find({city})
    res.send(serviceCenters)
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

exports.findNeaarestSpareShop = async(req,res)=>{
  const {city} = req.body

  try {
    const spareParts = await SpareShop.find({city})
    res.send(spareParts)
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

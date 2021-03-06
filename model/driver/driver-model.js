const mongoose = require('mongoose')
const UserType = require('../../enum/userType')
const Schema = mongoose.Schema
const validator = require('validator')

const driver = new Schema({

  userId:{type:Schema.Types.ObjectId, ref:'auth', required:[true, 'Driver id required']},
  userName:{type:String},
  nic:{type:String},
  mobile:{type:String},
  vehicleNumber:{type:String},
  vehicleColor:{type:String},
  profileImage:{type:String},
  vehicleImage:{type:String},
  userType:{type:String,enum:UserType},
  latitude:{type:Number},
  longitude:{type:Number},
  city:{type:String},
  mapImagePreview:{type:String}

})


driver.methods.toJSON = function () {
  const driver = this;
  const driverObject = driver.toObject();

  delete driverObject.tokens;
  delete driverObject.password;

  return driverObject;
};

driver.virtual('questions',{
  'ref':'faq',
  'localField':'_id',
  'foreignField':'driver'
})

const Driver = mongoose.model('Driver', driver)
module.exports = Driver

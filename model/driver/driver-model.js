const mongoose = require('mongoose')

const Schema = mongoose.Schema

const driver = new Schema({
  email:{type:String, required:true},
  name:{type:String},
  nic:{type:String},
  mobile:{type:String},
  vehicleNumber:{type:String},
  vehicleColor:{type:String},
  image:{type:String}
})



module.exports = mongoose.model('driver', driver)

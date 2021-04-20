const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointment = new Schema({
  driverId:{type:Schema.Types.ObjectId, ref:'Driver'},
  centerId:{type:Schema.Types.ObjectId, ref:'serviceCenter'},
  time:{type:String},
  date:{type:String},
  status:{type:String},
  centerName:{type:String},
  centerMobile:{type:String},
  serviceName:{type:String},
})

module.exports = mongoose.model('appointment', appointment)

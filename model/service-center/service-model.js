const mongoose = require('mongoose')
const Schema = mongoose.Schema

const service = new Schema({
  name:{type:String, required:[true, 'service name is required']},
  price:{type:Number},
  description:{type:String},
  image:String,
  serviceCenter:{type:Schema.Types.ObjectId, ref:'auth'},

})

module.exports = mongoose.model('service', service)

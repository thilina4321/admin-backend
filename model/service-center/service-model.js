const mongoose = require('mongoose')
const Schema = mongoose.Schema

const service = new Schema({
  name:{type:String, required:[true, 'service name is required']},
  price:{type:Number},
  description:{type:String},
  image:String,
  shopId:{type:Schema.Types.ObjectId, required:true}
})

module.exports = mongoose.model('service', service)

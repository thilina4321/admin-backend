const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sparePart = new Schema({
  name:{type:String, required:[true, 'spare part is required']},
  price:{type:Number},
  description:{type:String},
  image:String,
  shopId:{type:Schema.Types.ObjectId, ref:'auth'}
})

module.exports = mongoose.model('sparePart', sparePart)

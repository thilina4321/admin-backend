const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sparePart = new Schema({
  name:{type:String, required:[true, 'spare part is required']},
  price:{type:Number},
  description:{type:String},
  spareShop:{type:Schema.Types.ObjectId, ref:'auth'},
  image:String
})

module.exports = mongoose.model('sparePart', sparePart)

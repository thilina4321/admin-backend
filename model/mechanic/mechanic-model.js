const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mechanic = new Schema({
  email:{type:String, required:true},
  name:{type:String},
  nic:{type:String},
  mobile:{type:String},
  address:{type:String},
  about:{type:String},
  image:{type:String}
})

module.exports = mongoose.model('mechanic', mechanic)

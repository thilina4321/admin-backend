const mongoose = require('mongoose')

const Schema = mongoose.Schema

const spareshop = new Schema({
  email:{type:String, required:true},
  name:{type:String},
  mobile:{type:String},
  address:{type:String},
  openTime:{type:String},
  closeTime:{type:String},
  about:{type:String},
  image:{type:String}
})

module.exports = mongoose.model('spareshop', spareshop)

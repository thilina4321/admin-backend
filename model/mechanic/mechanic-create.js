const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')


const createMechanic =  new Schema({
  email:{
    type:String,
    required:true,
    unique:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Invalid email')
      }
    }
  },
  password:{
    type:String,
    required:true,

  }
})

module.exports = mongoose.model('createMechanic', createMechanic)

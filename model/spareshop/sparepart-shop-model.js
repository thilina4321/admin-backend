const mongoose = require('mongoose')

const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const spareshop = new Schema({
  email:{type:String, required:true,unique:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Invalid Email')
      }
    }
  },
  password:{type:String, required:true},
  name:{type:String,required:true},
  mobile:{type:String},
  address:{type:String},
  city:{type:String},

  openTime:{type:String},
  closeTime:{type:String},
  about:{type:String},
  image:{type:String},
  tokens: [{ token: { type: String } }],

})

spareshop.methods.toJSON = function () {
  const spareshop = this;
  const spareshopObject = spareshop.toObject();

  delete spareshopObject.tokens;
  delete spareshopObject.password;

  return spareshopObject;
};

spareshop.methods.generateToken = async function () {
  const spareshop = this;

  try {
    const token = jwt.sign({ id: spareshop._id },
      process.env.JWT_SECURE_KEY
      , );

    spareshop.tokens = spareshop.tokens.concat({ token });
    await spareshop.save();
    return token;

  } catch (error) {
    throw new Error("Something went wrong");
  }
};

spareshop.statics.loginWithEmailAndPassword = async (data) => {
  try {
    const spareshop = await SpareShop.findOne({ email: data.email });
    if (!spareshop) {
      throw new Error("Loging failed");
    }

    const compare = await bcrypt.compare(data.password, spareshop.password);
    if (!compare) {
      throw new Error("Invalid password");
    }

    return spareshop;
  } catch (error) {
    throw new Error("Login Failed");
  }
};

const SpareShop = mongoose.model('spareshop', spareshop)
module.exports = SpareShop

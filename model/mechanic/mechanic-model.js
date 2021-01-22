const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const mechanic = new Schema({
  email:{type:String, required:true,unique:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Invalid Email')
      }
    }
  },
  password:{type:String, required:true},
  name:{type:String, required:true},
  nic:{type:String},
  mobile:{type:String},
  address:{type:String},
  about:{type:String},
  image:{type:String},
  city:{type:String},
  userType:{type:String},
  tokens: [{ token: { type: String } }],

})

mechanic.methods.toJSON = function () {
  const mechanic = this;
  const mechanicObject = mechanic.toObject();

  delete mechanicObject.tokens;
  delete mechanicObject.password;

  return mechanicObject;
};



mechanic.methods.generateToken = async function () {
  const mechanic = this;

  try {
    const token = jwt.sign({ id: mechanic._id },   process.env.JWT_SECURE_KEY
      ,

    );

    mechanic.tokens = mechanic.tokens.concat({ token });
    await mechanic.save();
    return token;

  } catch (error) {
    throw new Error("Something went wrong");
  }
};


mechanic.statics.loginWithEmailAndPassword = async (data) => {
  try {
    const mechanic = await Mechanic.findOne({ email: data.email });
    if (!mechanic) {
      throw new Error("Loging failed");
    }

    const compare = await bcrypt.compare(data.password, mechanic.password);
    if (!compare) {
      throw new Error("Invalid password");
    }

    return mechanic;
  } catch (error) {
    throw new Error("Login Failed");
  }
};

const Mechanic = mongoose.model('mechanic', mechanic)
module.exports = Mechanic

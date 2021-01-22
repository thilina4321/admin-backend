const mongoose = require('mongoose')
const UserType = require('../../enum/userType')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const driver = new Schema({
  email:{type:String, required:true,
    unique:[true, 'This email already taken'],
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
  vehicleNumber:{type:String},
  vehicleColor:{type:String},
  profileImage:{type:String},
  vehicleImage:{type:String},
  userType:{type:UserType},
  latitude:{type:Number},
  longitude:{type:Number},
  city:{type:String},
  tokens: [{ token: { type: String } }],

})

driver.statics.loginWithEmailAndPassword = async (data) => {
  try {
    const driver = await Driver.findOne({ email: data.email });
    if (!driver) {
      throw new Error("Loging failed");
    }

    console.log(driver);
    const compare = await bcrypt.compare(data.password, driver.password);
    if (!compare) {
      throw new Error("Invalid password");
    }

    return driver;
  } catch (error) {
    throw new Error("Login Failed");
  }
};

driver.methods.toJSON = function () {
  const driver = this;
  const driverObject = driver.toObject();

  delete driverObject.tokens;
  delete driverObject.password;

  return driverObject;
};


driver.methods.generateToken = async function () {
  const driver = this;

  try {
    const token = jwt.sign({ id: driver._id },   process.env.JWT_SECURE_KEY
      , {
      expiresIn: "1h",
    });

    driver.tokens = driver.tokens.concat({ token });
    await driver.save();
    return token;

  } catch (error) {
    throw new Error("Something went wrong");
  }
};


driver.virtual('questions',{
  'ref':'faq',
  'localField':'_id',
  'foreignField':'driver'
})

const Driver = mongoose.model('driver', driver)
module.exports = Driver

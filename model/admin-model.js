const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const admin = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  tokens:[
    {token:{type:String}}
  ]
});

admin.statics.loginWithEmailAndPassword = async (data) => {
  const admin = await Admin.findOne({ email: data.email });
  if (!admin) {
    throw new Error("Loging failed");
  }

    const compare = await bcrypt.compare(data.password, admin.password);
    if (!compare) {
      throw new Error("Invalid password");
    }

    return admin;

}

admin.methods.toJSON = function(){
  const admin = this
  const adminObject = admin.toObject()

  delete adminObject.tokens
  delete adminObject.password

  return adminObject
}

admin.methods.generateToken = async function(){
  const admin = this

  const token = jwt.sign({id:admin._id}, process.env.JWT_SECURE_KEY , {expiresIn:'1h'})
  admin.tokens = admin.tokens.concat({token})
  await admin.save()
  return token
}

const Admin = mongoose.model("admin", admin);

module.exports = Admin;

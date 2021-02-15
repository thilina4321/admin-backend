const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserType = require('../enum/userType')

const auth = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  password: {
    type: String,
    required: [true, 'Password required'],
  },
  userName:{
    type:String,
    required:[true, 'Please provide a user name']
  },
  role:{
    type:String,
    required:[true, 'user type is not set'],
    enum:UserType
  },
  tokens: [{ token: { type: String } }],
});

auth.statics.loginWithEmailAndPassword = async (data) => {
  try {
    const auth = await Auth.findOne({ email: data.email });
    if (!auth) {
      throw new Error("Please register for the application first");
    }

    const compare = await bcrypt.compare(data.password, auth.password);
    if (!compare) {
      throw new Error("Invalid password");
    }

    return auth;
  } catch (error) {
    return {error:error.message}
  }
};



auth.methods.toJSON = function () {
  const auth = this;
  const authObject = auth.toObject();

  delete authObject.tokens;
  delete authObject.password;

  return authObject;
};

auth.methods.generateToken = async function () {
  const auth = this;

  try {
    const token = jwt.sign({ id: auth._id }, process.env.JWT_SECURE_KEY, {
      expiresIn: "1h",
    });

    auth.tokens = auth.tokens.concat({ token });
    await auth.save();
    return token;

  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const Auth = mongoose.model("auth", auth);

module.exports = Auth;

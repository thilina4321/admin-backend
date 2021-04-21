const mongoose = require('mongoose')

const Schema = mongoose.Schema
const validator = require('validator')

const serviceCenter = new Schema({

  userId:{type:Schema.Types.ObjectId, ref:'auth'},
  mobile:{type:String},
  address:{type:String},
  openTime:{type:String},
  closeTime:{type:String},
  image:{type:String},
  city:{type:String},
  latitude:Number,
  mapImagePreview:{type:String},

  longitude:Number,
  ratings:
    [{
      rating:{type:Number, default:0},
      driverId:Schema.Types.ObjectId
    }],
    totalRating:{type:Number, default:0},



  tokens: [{ token: { type: String } }],

})

serviceCenter.methods.toJSON = function () {
  const serviceCenter = this;
  const serviceCenterObject = serviceCenter.toObject();

  delete serviceCenterObject.tokens;
  delete serviceCenterObject.password;

  return serviceCenterObject;
};


// serviceCenter.methods.generateToken = async function () {
//   const serviceCenter = this;

//   try {
//     const token = jwt.sign({ id: serviceCenter._id },   process.env.JWT_SECURE_KEY
//       ,

//     );

//     serviceCenter.tokens = serviceCenter.tokens.concat({ token });
//     await serviceCenter.save();
//     return token;

//   } catch (error) {
//     throw new Error("Something went wrong");
//   }
// };

// serviceCenter.statics.loginWithEmailAndPassword = async (data) => {
//   try {
//     const serviceCenter = await ServiceCenter.findOne({ email: data.email });
//     if (!serviceCenter) {
//       throw new Error("Loging failed");
//     }

//     const compare = await bcrypt.compare(data.password, serviceCenter.password);
//     if (!compare) {
//       throw new Error("Invalid password");
//     }

//     return serviceCenter;
//   } catch (error) {
//     throw new Error("Login Failed");
//   }
// };

const ServiceCenter = mongoose.model('serviceCenter', serviceCenter)
module.exports = ServiceCenter

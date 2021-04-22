const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const validator = require("validator");

const spareshop = new Schema({

  userId:{type:Schema.Types.ObjectId, ref:'auth'},
  userName:{type:String},
  mobile: { type: String },
  address: { type: String },
  city: { type: String },
  totalRating: { type: Number, default: 0 },
  mapImagePreview:{type:String},
  count:{type:Number, default:0},


  ratings: [
    {
      rating: { type: Number, default: 0 },
      driverId: Schema.Types.ObjectId,
    },
  ],
  latitude:Number,
  longitude:Number,
  openTime: { type: String },
  closeTime: { type: String },
  about: { type: String },
  image: { type: String },
  tokens: [{ token: { type: String } }],
});

spareshop.methods.toJSON = function () {
  const spareshop = this;
  const spareshopObject = spareshop.toObject();

  delete spareshopObject.tokens;
  delete spareshopObject.password;

  return spareshopObject;
};


const SpareShop = mongoose.model("spareshop", spareshop);
module.exports = SpareShop;

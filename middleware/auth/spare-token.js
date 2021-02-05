const jwt = require("jsonwebtoken");
const SpareShop = require('../../model/spareshop/sparepart-shop-model')

const JWT_SECURE_KEY = process.env.JWT_SECURE_KEY
const UserType = require('../../enum/userType')

const auth = async(req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decordedToken = await jwt.verify(token, JWT_SECURE_KEY);
    const spare = await SpareShop.findOne({
      _id: decordedToken.id,
      "tokens.token": token,
    });

    if(!spare){
      throw new Error('No access')
    }

    if(spare.role != UserType.SPARE_PART_SHOP){
      throw new Error("Not allowed to access")
    }

    req.spare = spare
    req.token = token
    next();

  } catch (err) {
     req.error = err.message
     next()
  }
};

module.exports = auth;

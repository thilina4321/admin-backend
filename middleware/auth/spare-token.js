const jwt = require("jsonwebtoken");
const Spare = require("../../model/spareshop/sparepart-shop-model");
const JWT_SECURE_KEY = process.env.JWT_SECURE_KEY

const auth = async(req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decordedToken = await jwt.verify(token, JWT_SECURE_KEY);
    const spare = await Spare.findOne({
      _id: decordedToken.id,
      "tokens.token": token,
    });

    if(!spare){
       new Error('No access')
    }

    req.spare = spare
    req.token = token
    next();

  } catch (err) {
     new Error(err);
  }
};

module.exports = auth;

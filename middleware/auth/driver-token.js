const jwt = require("jsonwebtoken");
const Driver = require("../../model/driver/driver-model");
const JWT_SECURE_KEY = process.env.JWT_SECURE_KEY

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decordedToken = await jwt.verify(token,   process.env.JWT_SECURE_KEY
      );
    const driver = await Driver.findOne({
      _id: decordedToken.id,
      "tokens.token": token,
    });

    if(!driver){
       new Error('No access')
    }

    req.driver = driver
    req.token = token
    next();

  } catch (err) {
     new Error(err);
  }
};

module.exports = auth;

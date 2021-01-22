const jwt = require("jsonwebtoken");
const Service = require("../../model/service-center/service-center-model");
const JWT_SECURE_KEY = process.env.JWT_SECURE_KEY

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decordedToken = await jwt.verify(token, JWT_SECURE_KEY);
    const service = await Service.findOne({
      _id: decordedToken.id,
      "tokens.token": token,
    });

    if(!service){
       new Error('No access')
    }

    req.serviceCenter = service
    req.token = token
    next();

  } catch (err) {
     new Error(err);
  }
};

module.exports = auth;

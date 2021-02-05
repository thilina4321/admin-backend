const jwt = require("jsonwebtoken");
const Auth = require('../../model/Auth-model')

const JWT_SECURE_KEY = process.env.JWT_SECURE_KEY
const UserType = require('../../enum/userType')

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decordedToken = await jwt.verify(token, JWT_SECURE_KEY);
    const service = await Auth.findOne({
      _id: decordedToken.id,
      "tokens.token": token,
    });

    if(!service){
      throw new Error('No access')
    }

    if(service.role != UserType.SERVICE_CENTER){
     throw new Error("Not allowed to access")
    }

    req.serviceCenter = service
    req.token = token
    next();

  } catch (err) {
    req.error = err.message
    next()
  }
};

module.exports = auth;

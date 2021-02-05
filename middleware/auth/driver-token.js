const jwt = require("jsonwebtoken");
const Auth = require('../../model/Auth-model')
const JWT_SECURE_KEY = process.env.JWT_SECURE_KEY
const UserType = require('../../enum/userType');

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decordedToken = await jwt.verify(token,process.env.JWT_SECURE_KEY
      );
      const driver = await Auth.findOne({
        _id: decordedToken.id,
        "tokens.token": token,
      });

      if(!driver){
       throw new Error('No access')
      }

      if(driver.role != UserType.DRIVER){
        throw new Error("Not allowed to access")
      }

    next();

  } catch (err) {
     req.error = error
     next()
  }
};

module.exports = auth;

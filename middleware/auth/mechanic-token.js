const jwt = require("jsonwebtoken");
const Mechanic = require("../../model/mechanic/mechanic-model");
const JWT_SECURE_KEY = process.env.JWT_SECURE_KEY
const UserType = require('../../enum/userType')

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decordedToken = await jwt.verify(token, JWT_SECURE_KEY);
    const mechanic = await Mechanic.findOne({
      _id: decordedToken.id,
      "tokens.token": token,
    });

    if(!mechanic){
      throw new Error('No access')
    }

    if(mechanic.role != UserType.MECHANIC){
      throw new Error("Not allowed to access")
    }

    req.mechanic = mechanic
    req.token = token
    next();

  } catch (err) {
     req.error = err.message
     next()
  }
};

module.exports = auth;

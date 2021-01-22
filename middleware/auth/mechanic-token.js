const jwt = require("jsonwebtoken");
const Mechanic = require("../../model/mechanic/mechanic-model");
const JWT_SECURE_KEY = process.env.JWT_SECURE_KEY

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log(token);
  try {
    const decordedToken = await jwt.verify(token, JWT_SECURE_KEY);
    const mechanic = await Mechanic.findOne({
      _id: decordedToken.id,
      "tokens.token": token,
    });

    if(!mechanic){
       new Error('No access')
    }

    req.mechanic = mechanic
    req.token = token
    next();

  } catch (err) {
     new Error(err);
  }
};

module.exports = auth;

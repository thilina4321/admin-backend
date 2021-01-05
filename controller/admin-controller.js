const bcrypt = require("bcryptjs");
const Admin = require("../model/admin-model");

exports.signup = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const hash = await bcrypt.hash(data.password, 8);
    const admin = await Admin.create({ email: data.email, password: hash });
    const savedAdmin = await admin.save();

    return res.status(201).send(savedAdmin);
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const data = req.body;
  try {
    const admin = await Admin.loginWithEmailAndPassword({
      email: data.email,
      password: data.password,
    });

    const token = await admin.generateToken()

    res.status(200).send({admin, token})

  } catch (err) {
    return res.status(403).send({error:err.message})
  }
};

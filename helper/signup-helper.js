const Auth = require('../model/Auth-model')
const bcrypt = require('bcryptjs')

exports.signupUser = async(data, role)=>{
  const {email, password, userName} = data

  try {
    const hash = await bcrypt.hash(password, 8)
    const driver = new Auth({
      email,
      password:hash,
      userName,
      role
    })

    const savedUser = await driver.save()
    return savedUser

  } catch (error) {
    console.log(error);
    return {error:error.message}
  }
}

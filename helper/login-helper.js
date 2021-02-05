const Auth = require('../model/Auth-model')

exports.loginHelper = async (data) => {

  try {
    const user = await Auth.loginWithEmailAndPassword(data);
    if(user.error){
      return {error:user.error}
    }
    const token = await user.generateToken();
    return { user, token}

  } catch (error) {
    return {error:error.message}
  }
};

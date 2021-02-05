exports.addImage = async (Model, user, profileImage) => {
  try {
    const image = await Model.findOneAndUpdate({user}, profileImage, {
      runValidators: true,
      new: true,
    });
    return {image};
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

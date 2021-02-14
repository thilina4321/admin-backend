const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const faq = new Schema({
  question: {
    type: String,
    required: true,
  },
  questionImage: {
    type: String,
  },
  answers: [
    {
      authorId:{type:Schema.Types.ObjectId, ref:'mechanic'},
      answer: { type: String },
    },
  ],
  driverId:{type:Schema.Types.ObjectId, ref:'auth'}
});


faq.methods.provideAnswer = async function(id,ans){

  const answer = this
  try {
    console.log(ans);
    answer.answers = answer.answers.concat({authorId:id, answer:ans})
    const newAnswer = await answer.save()
    return newAnswer

  } catch (error) {
    throw new Error("something went wrong")
  }

}

const FAQ = mongoose.model("faq", faq);
module.exports = FAQ

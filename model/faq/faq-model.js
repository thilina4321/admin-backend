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
  answers: {
    type: [
      {
        authorId: { type: Schema.Types.ObjectId, ref: "auth" },
        answer: { type: String },
      },
    ],
    default: [],
  },
  driverId: { type: Schema.Types.ObjectId, ref: "auth" },
});

faq.methods.provideAnswer = async function (id, ans) {
  const answer = this;
  try {
    answer.answers = answer.answers.concat({ authorId: id, answer: ans });
    const newAnswer = await answer.save();
    return { newAnswer };
  } catch (error) {
    throw { error: error.message };
  }
};

const FAQ = mongoose.model("faq", faq);
module.exports = FAQ;

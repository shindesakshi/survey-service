const mongoose = require("mongoose");

const onboardingAnswerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"onboardingquestions"
    },
    answer: {
      type: mongoose.Schema.Types.Mixed
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("onboardingAnswer", onboardingAnswerSchema);

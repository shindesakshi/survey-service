const mongoose = require("mongoose");

const onboardingQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.Mixed
    },
    options: [
      {
        value: {
          type: mongoose.Schema.Types.Mixed
        }
      }
    ],
    questionType: {
      type: String,
      enum: ["SINGLE_CHOICE", "MULTIPLE_CHOICE", "SELECT", "INPUT_BOX", "DATE"]
    },
    key: {
      type: String
    },
    category: {
      type: String
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("onboardingQuestion", onboardingQuestionSchema);

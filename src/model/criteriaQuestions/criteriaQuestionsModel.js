const mongoose = require("mongoose");

const criteriaQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.Mixed
    },
    options: Array,
    questionType: {
      type: mongoose.Schema.Types.Mixed
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

module.exports = mongoose.model("criteriaquestion", criteriaQuestionSchema);

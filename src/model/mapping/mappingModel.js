const mongoose = require("mongoose");

const mappingSchema = new mongoose.Schema(
  {
    onboardingQuestionId: {
      type: mongoose.Schema.Types.ObjectId
    },
    criteriaQuestionId: {
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("mapping", mappingSchema);

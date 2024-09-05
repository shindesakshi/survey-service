const mongoose = require("mongoose");
const QUESTIONNAIRE_CONSTANT = require("../../constants/survey.constants");

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      QUESTIONNAIRE_CONSTANT.TYPE.DESCRIPTION,
      QUESTIONNAIRE_CONSTANT.TYPE.MULTIPLE_CHOICE,
      QUESTIONNAIRE_CONSTANT.TYPE.FREE_TEXT,
      QUESTIONNAIRE_CONSTANT.TYPE.SINGLE_CHOICE,
      QUESTIONNAIRE_CONSTANT.TYPE.RATE,
      QUESTIONNAIRE_CONSTANT.TYPE.GRID,
      QUESTIONNAIRE_CONSTANT.TYPE.LINESCALE,
      QUESTIONNAIRE_CONSTANT.TYPE.HEDONICSCALE,
      QUESTIONNAIRE_CONSTANT.TYPE.JAR,
      QUESTIONNAIRE_CONSTANT.TYPE.IMAGE_UPLOAD,
    ],
  },
  question: {
    type: String,
  },
  description: {
    type: String,
  },
  ans: {
    type: mongoose.Schema.Types.Mixed,
  },
  opts: mongoose.Schema.Types.Mixed,
  icon: { type: String },
  details: {
    mandatoryMessage: { type: String },
    isMandatory: { type: Boolean },
    validationMessage: { type: String },
    validationRegex: { type: String },
    isCaseSensitive: { type: Boolean },
  },
  image: { type: String },
  display: { type: mongoose.Schema.Types.Mixed },
  skip: { type: mongoose.Schema.Types.Mixed }
});
const feedbackSchema = new mongoose.Schema(
  {
    questions: [questionSchema],
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "questionnaires",
      immutable: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

feedbackSchema.index({ name: "surveyId" });

module.exports = mongoose.model("feedbacks", feedbackSchema);

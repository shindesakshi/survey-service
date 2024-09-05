const mongoose = require("mongoose");
const QUESTIONNAIRE_CONSTANT = require("../../constants/survey.constants");

const questionSchema = new mongoose.Schema({
  type: {
    type: String, //  From questionnaires collection
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
      QUESTIONNAIRE_CONSTANT.TYPE.IMAGE_UPLOAD
    ],
    required: true
  },
  question: {
    type: String //  From questionnaires collection
  },
  description: {
    type: String
  },
  opts: mongoose.Schema.Types.Mixed, //  From questionnaires collection
  summ: mongoose.Schema.Types.Mixed, //  Will be use to store users feedback
  icon: { type: String }, //  From questionnaires collection
  details: {
    mandatoryMessage: { type: String },
    isMandatory: { type: Boolean },
    validationMessage: { type: String },
    validationRegex: { type: String },
    isCaseSensitive: { type: Boolean }
  },
  image: { type: String },
  display: { type: mongoose.Schema.Types.Mixed },
  skip: { type: mongoose.Schema.Types.Mixed }
});
const summarySchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization"
    },
    totalResponseCount: {
      type: Number,
      default: 0
    },
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "surveys"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    questions: [questionSchema],
    styleDetails: { type: Object }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);
module.exports = mongoose.model("summary", summarySchema);

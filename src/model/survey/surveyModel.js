const mongoose = require("mongoose");
const SURVEY_CONSTANT = require("../../constants/survey.constants");

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      SURVEY_CONSTANT.TYPE.DESCRIPTION,
      SURVEY_CONSTANT.TYPE.MULTIPLE_CHOICE,
      SURVEY_CONSTANT.TYPE.FREE_TEXT,
      SURVEY_CONSTANT.TYPE.SINGLE_CHOICE,
      SURVEY_CONSTANT.TYPE.RATE,
      SURVEY_CONSTANT.TYPE.GRID,
      SURVEY_CONSTANT.TYPE.LINESCALE,
      SURVEY_CONSTANT.TYPE.HEDONICSCALE,
      SURVEY_CONSTANT.TYPE.JAR,
      SURVEY_CONSTANT.TYPE.IMAGE_UPLOAD
    ],
    required: true
  },
  question: {
    type: String
  },
  description: {
    type: String
  },
  opts: mongoose.Schema.Types.Mixed,
  icon: { type: String },
  details: {
    mandatoryMessage: { type: String },
    isMandatory: { type: Boolean },
    validationMessage: { type: String },
    validationRegex: { type: String },
    isCaseSensitive: { type: Boolean }
  },
  pageNo: { type: Number },
  image: { type: String }
});

const SurveySchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
      immutable: true
    },
    type: {
      type: String,
      enum: ["scratch", "external"],
      required: true
     },
    status: {
      type: String,
      enum: [
        SURVEY_CONSTANT.STATUS.DRAFT,
        SURVEY_CONSTANT.STATUS.PUBLISH,
        SURVEY_CONSTANT.STATUS.UNPUBLISHED
      ],
      default: SURVEY_CONSTANT.STATUS.DRAFT
    },
    questions: [questionSchema],
    link: { type: String },
    surveyName: { type: String },
    surveyDescription: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organizationusers",
      immutable: true
    },
    styleDetails: { type: Object },
    outro: {
      description: {
        type: String
      },
      redirectionUrl: {
        type: String
      },
      apiUrl: {
        type: String
      }
    },
    isSkipOutro: {
      type: Boolean
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

SurveySchema.virtual("feedbackCount", {
  ref: "feedbacks", // The model to use
  localField: "_id", // Find people where `localField`
  foreignField: "surveyId", // is equal to `foreignField`
  count: true // And only get the number of docs
});
module.exports = mongoose.model("survey", SurveySchema);

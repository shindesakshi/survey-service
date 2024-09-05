const feedbackModel = require("./feedbackModel");

const service = {};

service.getFeedbacks = (surveyId, skip, limit) => {
  const params = {
    surveyId
  };

  return feedbackModel
    .find(params)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();
};

service.getAllFeedbacks = (surveyId) =>
  feedbackModel.find({ surveyId }).lean().exec();

service.saveFeedback = (questions, surveyId, userId) =>
  feedbackModel.create({
    questions,
    surveyId,
    userId
  });

service.getFeedbacksCount = (data) => feedbackModel.count(data);
service.getResponseCount = (data) => feedbackModel.find(data);

module.exports = service;

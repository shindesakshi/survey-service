const { ObjectId } = require("mongoose").Types;
const onboardingAnswerModel = require("./onboardingAnswerModel");

const service = {};

service.create = (userId, questionId, answer) =>
  onboardingAnswerModel.create({ userId, questionId, answer });

service.createMany = (data) => onboardingAnswerModel.insertMany(data);

module.exports = service;

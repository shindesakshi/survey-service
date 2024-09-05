const criteriaQuestions = require("./criteriaQuestionsModel");

const criteriaQuestionsService = {};

criteriaQuestionsService.getCriteriaQuestions = (data) =>
  criteriaQuestions.find(data);

criteriaQuestionsService.createOneCriteriaQuestion = (data) =>
  criteriaQuestions.create(data);

criteriaQuestionsService.editCriteriaQuestion = (id, data) =>
  criteriaQuestions.findByIdAndUpdate({ _id: id }, data);

criteriaQuestionsService.deleteCriteriaQuestion = (id) =>
  criteriaQuestions.findByIdAndDelete({ _id: id });

criteriaQuestionsService.getNewlyAdded = async (dt) =>
  criteriaQuestions.find({ createdAt: { $gte: dt } });

module.exports = criteriaQuestionsService;

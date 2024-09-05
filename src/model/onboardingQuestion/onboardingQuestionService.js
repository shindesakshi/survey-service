const onboardingQuestion = require("./onboardingQuestionModel");

const onboardingQuestionService = {};

onboardingQuestionService.createOneOnboardingQuestion = (data) =>
  onboardingQuestion.create(data);

onboardingQuestionService.createManyOnboardingQuestion = (data) =>
  onboardingQuestion.insertMany(data);

onboardingQuestionService.editOnboardingQuestion = (id, data) =>
  onboardingQuestion.findByIdAndUpdate({ _id: id }, data);

onboardingQuestionService.deleteOnboardingQuestion = (id) =>
  onboardingQuestion.findByIdAndDelete({ _id: id });

onboardingQuestionService.getNewlyAdded = async (dt) =>
  onboardingQuestion.find({ createdAt: { $gte: dt } });

onboardingQuestionService.getOnboardingQuestions = (data) =>
  onboardingQuestion.find(data).sort({ order: 1 });

onboardingQuestionService.getOnboardingQuestionsLength = (data) =>
  onboardingQuestion.count(data);

module.exports = onboardingQuestionService;

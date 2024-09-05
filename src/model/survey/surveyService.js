const surveyModel = require("./surveyModel");

const service = {};

service.getSurvey = (organizationId, skip, limit) => {
  if (skip >= 0 && limit) {
    return surveyModel
      .find({ organizationId, type: { $ne: "external" } })
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .populate("feedbackCount")
      .lean()
      .exec();
  } else {
    return surveyModel
      .find({ organizationId, type: { $ne: "external" } })
      .sort({ created_at: -1 })
      .populate("feedbackCount")
      .lean();
  }
};

service.getSurveyByOrganization = (organizationId) =>
  surveyModel.find({ organizationId });

service.createSurvey = (
  organizationId,
  type,
  questions,
  link,
  surveyName,
  userId,
  styleDetails,
  surveyDescription,
  isSkipOutro,
  outro,
  welcome
) =>
  surveyModel.create({
    organizationId,
    type,
    questions,
    link,
    surveyName,
    userId,
    styleDetails,
    surveyDescription,
    isSkipOutro,
    outro,
    welcome
  });

service.getByIdAsDbObj = (_id) => surveyModel.findOne({ _id }).exec();

service.getSurveys = (organizationId, skip, limit) => {
  if (skip >= 0 && limit) {
    return surveyModel
      .find({ organizationId, type: { $ne: "external" } })
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .populate("feedbackCount")
      .lean()
      .exec();
  } else {
    return surveyModel
      .find({ organizationId, type: { $ne: "external" } })
      .sort({ created_at: -1 })
      .populate("feedbackCount")
      .lean();
  }
};

service.getSurveyCount = (organizationId) =>
  surveyModel.count({ organizationId, type: { $ne: "external" } });

service.getOne = (_id) => surveyModel.findOne({ _id }).lean().exec();

service.checkSurveyNameByUserId = (userId, surveyName, _id) => {
  let filter = {};
  if (_id) {
    filter = { userId, surveyName, _id: { $ne: _id } };
  } else {
    filter = { userId, surveyName };
  }
  return surveyModel.count(filter);
};

service.getAllSurvey = () => surveyModel.find();

service.getSurveyById = (id) => surveyModel.findById(id);

module.exports = service;

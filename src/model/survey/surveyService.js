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

module.exports = service;

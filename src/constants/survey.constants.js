const SURVEY_CONSTANT = {};

SURVEY_CONSTANT.TYPE = {
  DESCRIPTION: "desc",
  MULTIPLE_CHOICE: "multiChoice",
  FREE_TEXT: "freeTxt",
  SINGLE_CHOICE: "singleChoice",
  OPINION: "opinion",
  RATE: "rating",
  GRID: "grid",
  LINESCALE: "lineScale",
  HEDONICSCALE: "hedonicScale",
  JAR: "JAR",
  IMAGE_UPLOAD: "IMAGE_UPLOAD"
};

SURVEY_CONSTANT.STATUS = {
  DRAFT: "draft",
  PUBLISH: "publish",
  UNPUBLISHED: "unpublished"
};

module.exports = SURVEY_CONSTANT;

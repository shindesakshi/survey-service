const summaryModel = require("./summaryModel");
const QUESTIONNAIRE_CONSTANT = require("../../constants/survey.constants");
const _ = require("underscore");

const service = {};

service.createSummary = (organizationId, surveyId, questions, styleDetails) =>
  summaryModel.create({
    organizationId,
    surveyId,
    questions,
    styleDetails,
  });

service.getOne = (data) => summaryModel.findOne(data).lean().exec();

service.buildDefaultSummary = (questions) => {
  let summ = [];
  for (const question of questions) {
    let st = {};
    st.question = question.question;
    st.type = question.type;
    if (question.opts) {
      st.opts = question.opts;
    }
    if (question.icon) {
      st.icon = question.icon;
    }
    st.summ = [];
    if (
      question.type === QUESTIONNAIRE_CONSTANT.TYPE.MULTIPLE_CHOICE ||
      question.type === QUESTIONNAIRE_CONSTANT.TYPE.SINGLE_CHOICE ||
      question.type === QUESTIONNAIRE_CONSTANT.TYPE.HEDONICSCALE ||
      question.type === QUESTIONNAIRE_CONSTANT.TYPE.JAR
    ) {
      for (const stopts of st.opts) {
        st.summ.push({ ans: stopts, cnt: 0 });
      }
    } else if (question.type === QUESTIONNAIRE_CONSTANT.TYPE.RATE) {
      for (let i = 1; i <= st.opts.range; i++) {
        st.summ.push({ ans: i, cnt: 0 });
      }
    } else if (question.type === QUESTIONNAIRE_CONSTANT.TYPE.GRID) {
      for (const sample of st.opts.samples) {
        let ans = [];
        for (const measurables of st.opts.measurables) {
          ans.push({ measurables: measurables, cnt: 0 });
        }
        st.summ.push({ sample: sample, ans: ans });
      }
    } else if (question.type === QUESTIONNAIRE_CONSTANT.TYPE.LINESCALE) {
      st.summ = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    summ.push(st);
  }
  return summ;
};

service.incrSummaryCnt = (Summary, userdata) => {
  for (const ud of userdata) {
    const I = _.findLastIndex(Summary, {
      question: ud.question,
      type: ud.type,
    });
    if (I > -1) {
      // Element is there
      if (
        Summary[I].type == QUESTIONNAIRE_CONSTANT.TYPE.DESCRIPTION ||
        Summary[I].type == QUESTIONNAIRE_CONSTANT.TYPE.FREE_TEXT
      ) {
        Summary[I].summ.push(ud.ans);
      } else if (Summary[I].type == QUESTIONNAIRE_CONSTANT.TYPE.SINGLE_CHOICE) {
        const IofAns = _.findLastIndex(Summary[I].summ, { ans: ud.ans });
        if (IofAns > -1) {
          Summary[I].summ[IofAns].cnt++;
        }
      } else if (
        Summary[I].type == QUESTIONNAIRE_CONSTANT.TYPE.MULTIPLE_CHOICE
      ) {
        _.each(ud.ans, (ans) => {
          const IofAns = _.findLastIndex(Summary[I].summ, { ans: ans });
          if (IofAns > -1) {
            Summary[I].summ[IofAns].cnt++;
          }
        });
      } else if (
        Summary[I].type == QUESTIONNAIRE_CONSTANT.TYPE.HEDONICSCALE ||
        Summary[I].type == QUESTIONNAIRE_CONSTANT.TYPE.JAR
      ) {
        const IofAns = _.findLastIndex(Summary[I].summ, { ans: ud.ans });
        if (IofAns > -1) {
          Summary[I].summ[IofAns].cnt++;
        }
      } else if (Summary[I].type == QUESTIONNAIRE_CONSTANT.TYPE.LINESCALE) {
        let sclI = parseInt(ud.ans / 10);
        if (sclI > -1) {
          Summary[I].summ[sclI]++;
        }
      } else if (Summary[I].type == QUESTIONNAIRE_CONSTANT.TYPE.RATE) {
        const IofAns = _.findLastIndex(Summary[I].summ, {
          ans: parseInt(ud.ans),
        });
        if (IofAns > -1) {
          Summary[I].summ[IofAns].cnt++;
        }
      } else if (Summary[I].type == QUESTIONNAIRE_CONSTANT.TYPE.GRID) {
        if (ud.ans) {
          for (const ans of ud.ans) {
            const samlpeI = _.findLastIndex(Summary[I].summ, {
              sample: ans.sample,
            });
            if (samlpeI > -1) {
              const measurI = _.findLastIndex(Summary[I].summ[samlpeI].ans, {
                measurables: ans.measurable,
              });
              if (measurI > -1) {
                Summary[I].summ[samlpeI].ans[measurI].cnt++;
              }
            }
          }
        }
      } else {
        // Only for exception
        Summary[I].summ.push(ud.ans);
      }
    }
  }

  service.updateOne = async (sel, data) =>
    await summaryModel.updateOne(sel, { $set: data });

  return Summary;
};
module.exports = service;

/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const axios = require('axios');

const Api = {};

Api.get = (url, options) => {
  const config = {
    method: 'get',
    url,
  };

  for (const key in options) {
    config[key] = options[key];
  }

  return axios(config);
};

Api.post = (url, options) => {
  const config = {
    method: 'post',
    url,
  };

  for (const key in options) {
    config[key] = options[key];
  }

  return axios(config);
};

module.exports = Api;

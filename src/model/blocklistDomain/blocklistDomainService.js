const blocklistDomain = require("./blocklistDomainModel");

const blocklistDomainService = {};

blocklistDomainService.checkIfPresent = (name) =>blocklistDomain.count({ domain: name });

module.exports = blocklistDomainService;

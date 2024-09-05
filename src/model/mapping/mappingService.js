const mapping = require("./mappingModel");

const MappingService = {};

MappingService.getAllMappings = (data) => mapping.find(data);

MappingService.addMapping = (data) => mapping.create(data);

MappingService.editMapping = (id, data) =>
  mapping.findByIdAndUpdate({ _id: id }, data);

MappingService.deleteMapping = (id) => mapping.findByIdAndDelete({ _id: id });

module.exports = MappingService;

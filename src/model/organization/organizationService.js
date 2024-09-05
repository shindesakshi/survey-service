const organization = require("./organizationModel");

const organizationService = {};

organizationService.create = (name, admin, domainAddress) =>
  organization.create({ name, admin, domainAddress });
organizationService.count = (params) => organization.count(params);
organizationService.findOne = (params) => organization.findOne(params);

organizationService.updateMemberCount = (id, count) =>
  organization.findByIdAndUpdate(id, { $set: { noOfMembers: count } });

organizationService.getOrganization = (data, skip, limit) =>
  organization
    .find(data)
    .populate({ path: "admin" })
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 });

organizationService.getOneOrganization = (id) =>
  organization.find({ userId: id });

organizationService.changeStatus = async (id, status) =>
  await organization.updateOne({ _id: id }, { $set: { status: status } });

organizationService.countOrganization = (data) =>
  organization.countDocuments(data);

organizationService.getAll = () => organization.find({}).lean().exec();

module.exports = organizationService;

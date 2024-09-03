const organization = require("./organizationModel");

const organizationService = {};

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

// organizationService.getOrganizationIDs = (filter) => organization.find(filter).select({ _id: 1 });

// organizationService.getOneOrganization = (id) =>
//   organization.findById({ _id: id }).populate({ path: "admin" });

organizationService.countOrganization = (data) =>
  organization.countDocuments(data);

// organizationService.updateMembersCount = (id,count)=> organization.findByIdAndUpdate(id,{$set:{noOfMembers:count}})

// organizationService.deleteOrganization = (id) => organization.findByIdAndDelete(id);

organizationService.getAll = () => organization.find({}).lean().exec();

module.exports = organizationService;

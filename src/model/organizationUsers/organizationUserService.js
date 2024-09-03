const organizationUser = require("./organizationUserModel");

const organizationUserService = {};

// organizationUserService.getUser = (id) =>
//   organizationUser.findById({ _id: id });

organizationUserService.getUser = (data) =>
  organizationUser
    .find(data)
    .sort({ _id: 1 })
    .select({ name: 1, email: 1, emailVerified: 1, status: 1 });

organizationUserService.getAllUsers = () =>
  organizationUser
    .find()
    .select({ name: 1, email: 1, emailVerified: 1, status: 1 });

organizationUserService.changeStatus = async (id, status) =>
  await organizationUser.updateOne({ _id: id }, { $set: { status: status } });

module.exports = organizationUserService;

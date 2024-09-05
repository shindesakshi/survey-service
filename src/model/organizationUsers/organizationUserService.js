const bcrypt = require("bcryptjs");

const organizationUser = require("./organizationUserModel");
const generateToken = require("../../common/generateToken");

const organizationUserService = {};

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

organizationUserService.create = (
  name,
  email,
  organizationId,
  password,
  admin,
  emailVerified = false
) => {
  const user = new organizationUser({
    name,
    email,
    organizationId,
    password,
    admin,
    emailVerified
  });
  return user.save();
};
organizationUserService.count = (params) => organizationUser.count(params);

organizationUserService.findOne = (params) =>
  organizationUser.findOne(params).lean().exec();

organizationUserService.getById = (id) =>
  organizationUser.findById(id).populate("organizationId").lean().exec();

organizationUserService.getByIdAsDbObj = (id) =>
  organizationUser.findById(id).exec();

organizationUserService.auth = async (email, password) => {
  const userDetails = await organizationUser
    .findOne({ email })
    .populate({ path: "organizationId" })
    .lean()
    .exec();

  if (!userDetails) throw new Error("User with the email id not found");
  const compare = bcrypt.compareSync(password, userDetails.password);
  if (!compare) throw new Error("Incorrect password");
  const token = await generateToken(
    {
      userId: userDetails._id,
      purpose: "AUTH",
      role: "BUSINESS_USER",
      admin: userDetails.admin
    },
    "7d"
  );
  return { token, userDetails };
};

organizationUserService.verifyEmail = async (id) => {
  const userDetails = await organizationUser
    .findByIdAndUpdate(id, { $set: { emailVerified: true } }, { new: true })
    .populate({ path: "organizationId" })
    .lean()
    .exec();

  const token = await generateToken(
    {
      userId: userDetails._id,
      purpose: "AUTH",
      role: "BUSINESS_USER",
      admin: userDetails.admin
    },
    "7d"
  );
  return { token, userDetails };
};

organizationUserService.deleteByEmail = (email) =>
  organizationUser.deleteMany({ email });

organizationUserService.getAllMembers = (organizationId, skip, limit) =>
  organizationUser
    .find({ organizationId })
    .sort({ admin: -1 })
    .skip(skip)
    .limit(limit)
    .select("name email admin")
    .lean()
    .exec();

organizationUserService.getOrganizationUserCount = (organizationId) =>
  organizationUser.count({ organizationId });

module.exports = organizationUserService;

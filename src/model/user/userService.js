const user = require("./userModel");

const userService = {};

userService.getUser = (data) => user.find(data);

userService.getOneUser = (data) => user.findOne(data);

userService.getUserById = (id) => user.findById({ _id: id });

userService.createOneUser = (data) => user.create(data);

// userService.editUser = (id, data) => user.findByIdAndUpdate({ _id: id }, data);

// userService.deleteOneUser = (id) => user.findByIdAndDelete({ _id: id });

userService.checkIfUserExists = (email) => user.find({ email: email });

module.exports = userService;

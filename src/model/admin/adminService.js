const admin = require("./adminModel");

const adminService = {};

adminService.getAdmin = (data) => admin.find(data);

adminService.getOneAdmin = (data) => admin.findOne(data);

adminService.getAdminById = (id) => admin.findById({ _id: id });

adminService.createOneAdmin = (data) => admin.create(data);

// adminService.editAdmin = (id, data) => admin.findByIdAndUpdate({ _id: id }, data);

// adminService.deleteOneAdmin = (id) => admin.findByIdAndDelete({ _id: id });

adminService.checkIfUserExists = (email) => admin.find({ email:email });

module.exports = adminService;

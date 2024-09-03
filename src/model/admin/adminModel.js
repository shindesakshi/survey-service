const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    }
},{
    timestamps : true
});

module.exports = mongoose.model("admin", adminSchema);
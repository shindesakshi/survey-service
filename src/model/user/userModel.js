const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    password: {
      type: String
    },
    mobile: {
      type: String
    },
    email: {
      type: String
    },
    status: {
      type: Boolean,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("user", userSchema);

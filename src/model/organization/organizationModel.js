const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organizationUser"
    },
    domainAddress: {
      type: String,
      required: true
    },
    noOfMembers: {
      type: Number,
      default: 1
    },
    status: {
      type: Number,
      enum: [1, 2, 3], // 1-> active , 2 -> deactive 3 -> delete
      default: 1
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model("organization", organizationSchema);

const mongoose = require('mongoose');

const organizationUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  admin: {
    type: Boolean,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organization',
  },
  password: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Number,
    enum: [1, 2, 3], // 1-> active , 2 -> deactive 3 -> delete
    default: 1,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

module.exports = mongoose.model('organizationUser', organizationUserSchema);
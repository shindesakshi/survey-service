const mongoose = require('mongoose');

const blocklistDomainSchema = new mongoose.Schema({
  domain: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('blocklistDomain', blocklistDomainSchema);

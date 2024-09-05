const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (body, exp) => jwt.sign(body, config.jwt.secret, { expiresIn: exp });

'use strict';
const signupUser = require('./controller/signup');

module.exports.register = (event, context, callback) => {
  signupUser.signup(event, context)
};

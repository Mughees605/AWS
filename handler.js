'use strict';
const signupUser = require('./controller/signup');

module.exports.signup = (event, context, callback) => {
  signupUser.signup(event, context)
};

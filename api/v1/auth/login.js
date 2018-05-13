/*
Author : Parshant Nagpal
Filename : login.js
Description : 'login the user and provide user the auth token'
*/




'use strict';

const login = require("../../../controllers/v1/auth/login");


module.exports = {
    method : 'POST',
    path : '/login',
    handler: login 
  }
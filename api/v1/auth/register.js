/*
Author : Parshant Nagpal
Filename : register.js
Description : 'Register the new user by adding email ,password and name'
*/


'use strict'
const register = require("../../../controllers/v1/auth/register");

module.exports = {
       method : 'POST',
         path : '/register',
         config: {
        auth: false,
         handler :  register
                  }
 
  }
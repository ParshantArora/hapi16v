'use strict';

const Boom = require('boom');


function authVerify(req, res) {
 
    if (req.header.authorization) {
      
        res(Boom.badRequest('Username taken'));
      }
  
    res(req.payload);
 
}
module.exports = {
  authVerify: authVerify
}
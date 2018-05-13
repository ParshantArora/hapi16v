var jwt = require('jsonwebtoken');
const config = require("../config/default.json");
const User = require('../models/users');
const Boom	 = require("boom");

module.exports = function (server, options) {

    return {
       
        authenticate: function (request, reply) {
            const req = request.raw.req;
            const authorization = req.headers.authorization;

            
			 if (!authorization) {
			     return reply(Boom.unauthorized("Please provide Auth token"));
			  }
			    /*
			    check if the token is created by our algorith and with our selected key
			    */ 
				jwt.verify(authorization, config.Jwt.key , { algorithms: [config.Jwt.algorithmUsed] }, function (err, payload) {
                 /*
                 if error Please provide a valid Auth token
                 */
				 if(err){
				 	return reply(Boom.unauthorized("Please provide a valid Auth token"));
				 }else{
				 	/*
                    if token created by our algorith and with our key then find user by token 
				 	*/
				    User.find({token : request.headers.authorization}).then((data) => {
	                    if(data.length > 0){
	                       /*
                           if found user then set token of particular user to blank
	                       */
	                   console.log("datatatatatat",data)
	                   return reply.continue({ credentials: { loginUser: data[0] } });

	                    }else{
	                    	return reply(Boom.unauthorized('No user with this token'));
	                    }
				    }); 
				 }
             });
        }
    };
};

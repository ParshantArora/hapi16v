/*
Author : Parshant Nagpal
Filename : logout.js
Description : 'log out the user session and clear the user token'
*/



'use strict';
const User = require('../../../models/users');
var jwt = require('jsonwebtoken');
const keydata = 'DemoHapiNode';
const algorithmUsed = 'HS512';

   


exports.register = function(server,options,next){
	server.route({
		method : 'POST',
		path : '/logout',
        config: {
        auth: 'default',
		handler: function(request,reply){	
		
        console.log("equest.auth",JSON.stringify(request.auth.credentials.loginUser))
			  User.updateOne({email : request.auth.credentials.loginUser.email},{token : ''}, {multi : false}, (err, res) => {
                           if(err) return handleError(err)
                           	reply(request.auth.credentials.loginUser.email+ ' Successfully logged out')
               })
		}
}



	})
	next();
}
exports.register.attributes = {
	name: 'logoutplugin',
	version: '1.0.0'

}

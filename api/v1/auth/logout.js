/*
Author : Parshant Nagpal
Filename : logout.js
Description : 'log out the user session and clear the user token'
*/



'use strict';
const User = require('../models/users');
var jwt = require('jsonwebtoken');
const keydata = 'DemoHapiNode';
const algorithmUsed = 'HS512';

exports.register = function(server,options,next){
	server.route({
		method : 'POST',
		path : '/logout',
		handler: function(request,reply){
			/*
            Check if the header contains authorizartion
			*/
			if(request.headers.hasOwnProperty("authorization")){
			    /*
			    check if the token is created by our algorith and with our selected key
			    */ 
				jwt.verify(request.headers.authorization, keydata , { algorithms: [algorithmUsed] }, function (err, payload) {
                 /*
                 if error Please provide a valid Auth token
                 */
				 if(err){
				       reply('Please provide a valid Auth token')
				 }else{
				 	/*
                    if token created by our algorith and with our key then find user by token 
				 	*/
				    User.find({token : request.headers.authorization}).then((data) => {
	                    if(data.length > 0){
	                       /*
                           if found user then set token of particular user to blank
	                       */
                           User.updateOne({email : data[0].email},{token : ''}, {multi : false}, (err, res) => {
                           if(err) return handleError(err)
                           	reply(data[0].email+ ' Successfully logged out')
                          })
	                    }else{
	                    	reply('no user with this token')
	                    }
				    }); 
				 }
});

			}else{
				reply('Please provide Auth token')
			}
			
  
    
		}
	})
	next();
}
exports.register.attributes = {
	name: 'logoutplugin',
	version: '1.0.0'

}

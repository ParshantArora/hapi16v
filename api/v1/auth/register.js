/*
Author : Parshant Nagpal
Filename : register.js
Description : 'Register the new user by adding email ,password and name'
*/


'use strict'
var bcrypt = require('bcrypt');
const User = require('../models/users')
const saltRounds = 10;
exports.register = function(server,option,next){
	server.route({
	     method : 'POST',
         path : '/register',
         handler :  function(request,reply){
             /*
              Check if the payload contains password ,email and name 
              */
            if(request.payload.hasOwnProperty("password") && request.payload.hasOwnProperty("email") && request.payload.hasOwnProperty("name")){
                  /*
                  Check if the same email id is registered or not 
                  */
                  User.find({email : request.payload.email}).then((data)=>{
                      	if(data.length == 0){
          				          let {password} = request.payload;
                            /*
                            if any user not found then encrypt password  with bycypt
                            */
                            bcrypt.hash(password,saltRounds, function(err,hash){
                              	request.payload = {...request.payload,password : hash}
                                const userdata = new User(request.payload);
                                userdata.save().then((data)=>{
                                	console.log("data saved")
                                	reply(data)
                                })
                           });
                   	}
                  	else{
                  		reply("user with "+ request.payload.email+ " is already registered")
                  	}
                  })   
          }else{
          	reply("Please fill the full details")
          }      
                    }
 
	});
	  next();
};
exports.register.attributes = {
	name : 'RegisterPlugin',
	version : '1.0.0'
}
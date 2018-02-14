'use strict';
var bcrypt =require('bcrypt');
const User = require('../models/users');
const saltRounds = 10;
exports.register = function(server,options,next){
	server.route({
		method : 'POST',
		path : '/login',
		handler: function(request,reply){

			if(request.payload.hasOwnProperty("password") && request.payload.hasOwnProperty("email")){
                User.find({email : request.payload.email}).then((data)=>{
               if(data.length > 0){
               bcrypt.compare(request.payload.password,data[0].password,function(err,res){
               	if(res){
                   reply('Your are logged in mr '+ request.payload.email)
               	}
                else{
               reply("Either the email or password is incorect")
                }
               })
                 }else{
                 	
            	reply("no user with " +request.payload.email+ " found")
            
                 }

                })

	     	}else{
	     		reply("Please fill email and Password")
	     	}
	}})
	next();
}	
exports.register.attributes = {
	name :'loginPlugin',
	version :"1.0.0"
}
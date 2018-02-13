'use strict'
var bcrypt = require('bcrypt');
const User = require('../models/users')
const saltRounds = 10;
exports.register = function(server,option,next){
	server.route({
	     method : 'POST',
         path : '/register',
         handler :  function(request,reply){
         	  //let payloads = request.payload;
         	 // let payl = {};
             if(request.payload.hasOwnProperty("password")){
            let {password} = request.payload;
            
             bcrypt.hash(password,saltRounds, function(err,hash){
             	request.payload = {...request.payload,password : hash}
             	//    console.log(payl)
            const userdata = new User(request.payload);
             
           
           //    console.log(userdata)

              userdata.save().then((data)=>{
              	console.log("data saved")
              	reply(data)
              })
             //payloads = {...payloads,password : hash}
           //  return{...request.payload,password : hash}
               //request.payload = {...request.payload,password : hash}
               	//console.log("hash",hash,payl )
            });
         
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
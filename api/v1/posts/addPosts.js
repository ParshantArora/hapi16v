/*
Author : Parshant Nagpal
Filename : addPosts.js
Description : 'Add posts by 'user
*/

'use strict'
var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');
const keydata = 'DemoHapiNode';
const algorithmUsed = 'HS512';


const User = require('../../../models/users');
const Posts = require('../../../models/posts');
const saltRounds = 10;

exports.register = function(server,options,next){
server.route({
	method : "POST",
	path : '/addPosts',
	handler :  function(request,reply){

		if(request.headers.hasOwnProperty('authorization')){

         jwt.verify(request.headers.authorization, keydata , { algorithms: [algorithmUsed] }, function (err, payload) {

           	if(err){
           		reply('please provide a valid token ');

           	}else{

           		User.find({token : request.headers.authorization}).then((data)=>{
           			if(data.length > 0){
                     request.payload = {...request.payload, userId : data[0]._id }


                     console.log("request.payload",request.payload)
                     const PostData =  new Posts(request.payload)
                           PostData.save().then(data=>{
                           	console.log(data)
                             reply(data)
                           }).catch(err=>{
                           	reply(err)
                           })

           			}else{
           				reply('no user with that token')
           			}
           		})
           	}

           })

		}
	}
})
next();
}
exports.register.attributes = {
	name :'addPostsPlugin',
	version :"1.0.0"
}
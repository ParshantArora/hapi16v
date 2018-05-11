/*
Author : Parshant Nagpal
Filename : addPosts.js
Description : 'Add posts by 'user
*/

'use strict'

const Boom   = require("boom");
const Posts = require('../../../models/posts');

exports.register = function(server,options,next){
server.route({
	method : "POST",
	path : '/addPosts',
   config: {
        auth: 'default',
	handler :  function(request,reply){
     request.payload = {...request.payload, userId : request.auth.credentials.loginUser._id }                
                     const PostData =  new Posts(request.payload)
                           PostData.save().then(data=>{
                            console.log(data)
                             reply(data)
                           }).catch(err=>{
                             console.log(err.message)
                            reply(Boom.badRequest(err.message))
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
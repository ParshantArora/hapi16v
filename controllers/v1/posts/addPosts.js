const Boom   = require("boom");
const Posts = require('../../../models/posts');
 module.exports = function(request,reply){
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
const Boom = require('boom');
const Posts = require('../../../models/posts');
module.exports = function (request,reply){
	if(request.payload["_id"]){
	Posts.find({_id : request.payload._id}).then((data)=>{
		if(data.length > 0){

			// user Posts.remove no data has been return 

			Posts.findByIdAndRemove({_id : request.payload._id},(err,todo)=>{
             if(err){
             	 reply({message  : "error"})
             	 return handleError(err); 
             }
             reply({message  : "SuccessFully deleted post", data : todo})
			})

		}else{
			  reply({ message: 'no posts with this id' })
		}
	})	
	}else{
		reply({message : "_id is required"});
	}
}
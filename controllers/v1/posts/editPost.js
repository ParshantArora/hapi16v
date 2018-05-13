/*
Author : Parshant Nagpal,
Filename : editPost.js,
Description : controller for editpost
*/
const Boom = require('boom');
const Posts = require('../../../models/posts')
module.exports = function (request, reply) {
  if (request.payload['_id']) {
    Posts.find({ _id: request.payload._id }).then((data) => {
      if (data.length > 0) {
        let dataToChanged = data[0];
        dataToChanged = { ...dataToChanged, ...request.payload };
        Posts.findByIdAndUpdate({ _id: request.payload._id },{ $set: dataToChanged},{ new: true },function(err,res){
        if(err){
        	reply(err)
        }
        reply(res)
        } )
      } else {
        reply({ message: 'no posts with this id' })
      }
    })


  } else {
    reply({ message: '_id is required' });
  }
}
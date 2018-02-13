'use strict'

exports.register = function(server,option,next){
	server.route({
	     method : 'POST',
         path : '/register',
         handler :  function(request,reply){
              console.log(request.payload)
              reply(request.payload)
                    }
	});
	  next();
};
exports.register.attributes = {
	name : 'RegisterPlugin',
	version : '1.0.0'
}
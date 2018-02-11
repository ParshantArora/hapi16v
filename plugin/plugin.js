'use strict'

exports.register =  function(server,options,next){
	  server.route({
         method : 'GET',
         path: '/ahlechak',
         handler : function(request,reply){
         	reply(options.message)
         }

	  });
	  next();
	};


exports.register.attributes = {
	name : 'myPlugin',
    version : '1.0.0'
};	
'use-strict';

exports.register = function(server,option,next){
        server.route({
        	method : 'GET',
        	path : 	'/yourplugin',
        	handler : function (request,reply){
        		reply({message : "your plugin",Name : "parshant"}).code(201)
        	}
        })
		next();
}
exports.register.attributes = {
	   name : 'yourPlugin',
	   version: '1.0.0'
}
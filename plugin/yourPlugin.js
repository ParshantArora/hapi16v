'use-strict';

exports.register = function(server,option,next){
        server.route({
        	method : 'GET',
        	path : 	'/yourplugin',
        	handler : function (request,reply){
        		reply("your plugin")
        	}
        })
		next();
}
exports.register.attributes = {
	   name : 'yourPlugin',
	   version: '1.0.0'
}
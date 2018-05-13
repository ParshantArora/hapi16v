'use-strict'
let api = require("../api/v1")
exports.register = function(server,option,next){

	console.log("apiiiii",api)
	server.route(api);
	next();
};

exports.register.attributes = {
     name : 'ApiPlugin',
     version : '1.0.0'
};
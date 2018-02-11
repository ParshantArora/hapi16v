'use-strict'

exports.register = function(server,option,next){
	const api = server.select('api','a');

	api.route({
      method : 'GET',
      path : "/apipath",
      handler : function(request,reply){
      	  reply("api works")
      }
	});
	next();
}
exports.register.attributes= {
	  name : "pluginWithSpecificApi",
	  version : '1.0.0'

 }

'use strict'
const Hapi = require('Hapi');
const server = new Hapi.Server();
server.connection({port : 3000,host : "localhost"});
server.start((err)=>{
	if(err){
	throw err;
	}
	console.log('Server is running at : ${server.info.uri}')
});
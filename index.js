'use strict'
const Hapi	 = require("Hapi");
const plugin = require("./plugin")

const scheme = require("./utilities/auth");

const server = new Hapi.Server();
const db = require('./database').db;
server.connection({ port: 4000,labels : ['api'] , host : "localhost"})
server.route({
	method : "GET",
	path : '/',
	handler : function(request,reply){
		reply("Hello World")
	} 
});

server.route({
	method : "GET",
	path:"/{name}",
	handler : function(request,reply){


		reply('Hello, '+ encodeURIComponent(request.params.name)+ '!')
	}
});


server.auth.scheme('custom', scheme);
server.auth.strategy('default', 'custom');

server.register(require("inert"),(err)=>{

if(err){
	throw err;
}
server.route([{
	method : 'GET',
	path : '/hello',
	handler: function(request,reply){
        reply.file('./public/hello.html');
	}
},{
	method : 'GET',
	path : '/image',
	handler: function(request,reply){
        reply.file('./public/images.jpg');
	}
}])


});

server.register([{
	register : require('./plugin/plugin'),
    options : {
    	message : "mesagesss are there"
    }
},	
	require('./plugin/pluginWithSpecificApi')
	],{
 routes : {
 	prefix :'/plugins'
 }
	},

	(err) => {
   if(err){
   	  console.log('Failed to load ',err)
   }

});





server.register(plugin
,{
		select : ['api'],
		routes : {
 	prefix :'/api/v1'
 }
	},(err) =>{
 
 if(err){
 	throw err;
 }	
 server.start((err)=>{
    if(err){
    	throw err;
    }
    server.connections.map((data,index)=>{
    	 server.log('info','Server running at : ${index} ' + server.connections[index].info.uri);
    })
   
 });
});
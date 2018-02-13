'use strict'
const Hapi = require("Hapi");
const Good = require("good");
const server = new Hapi.Server();
const db = require('./database').db;
server.connection({port : 3000,host : "localhost"});
server.connection({ port: 80, labels: ['api'] , host:"localhost"});
server.connection({ port: 8080, labels: ['a', 'c'] });
server.connection({ port: 4000,labels : ['auth'] , host : "localhost"})
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

server.register(require("inert"),(err)=>{

if(err){
	throw err;
}
server.route({
	method : 'GET',
	path : '/hello',
	handler: function(request,reply){
        reply.file('./public/hello.html');
	}
})

server.route({
	method : 'GET',
	path : '/image',
	handler: function(request,reply){
        reply.file('./public/images.jpg');
	}
})
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
server.register({
	register : require("./plugin/yourPlugin")},{
       select: ['a','c']
	}, (err) =>{
      if(err){
      	throw err;
      }
});

/* register the user 
*/

server.register({
	register : require("./auth/register")},{
     select : ['auth']
	}, (err) => {
      if(err){
          throw error;
       }
});
/*
server.register(require('./plugin/pluginWithSpecificApi'),(err) => {
	if(err){
		console.log("Failed to load ", err)
	}
});
*/
server.register({
	register: Good,
	options :  {
		 reporters: {
		 	 console : [{
		 	 	module: 'good-squeeze',
		 	 	name: 'Squeeze',
		 	 	args: [{
		 	 		response : '*',
                    log :  '*'
		 	 	      }]
		 	    },
		 	    {
		 	    	module : 'good-console'
		 	    },'stdout']
		 }
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

/*server.start((err)=>{
	if(err){
	throw err;
	}
	console.log('Server is running at : ${server.info.uri}')
});*/
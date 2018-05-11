'use strict'
const Boom	 = require("boom");
const Hapi	 = require("Hapi");
const Good = require("good");
const config = require("./config/default.json");
const User = require('./models/users');
var jwt = require('jsonwebtoken');
const server = new Hapi.Server();
const db = require('./database').db;

server.connection({port : 3000,host : "localhost"});
server.connection({ port: 8080, labels: ['api'] , host:"localhost"});
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

const scheme = function (server, options) {

    return {
       
        authenticate: function (request, reply) {
            const req = request.raw.req;
            const authorization = req.headers.authorization;

            
			 if (!authorization) {
			     return reply(Boom.unauthorized("Please provide Auth token"));
			  }
			    /*
			    check if the token is created by our algorith and with our selected key
			    */ 
				jwt.verify(authorization, config.Jwt.key , { algorithms: [config.Jwt.algorithmUsed] }, function (err, payload) {
                 /*
                 if error Please provide a valid Auth token
                 */
				 if(err){
				 	return reply(Boom.unauthorized("Please provide a valid Auth token"));
				 }else{
				 	/*
                    if token created by our algorith and with our key then find user by token 
				 	*/
				    User.find({token : request.headers.authorization}).then((data) => {
	                    if(data.length > 0){
	                       /*
                           if found user then set token of particular user to blank
	                       */
	                   console.log("datatatatatat",data)
	                   return reply.continue({ credentials: { loginUser: data[0] } });

	                    }else{
	                    	return reply(Boom.unauthorized('No user with this token'));
	                    }
				    }); 
				 }
             });
        }
    };
};

server.auth.scheme('custom', scheme);
server.auth.strategy('default', 'custom');

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
	register : require("./api/v1/auth/register")},{
     select : ['auth']
	}, (err) => {
      if(err){
          throw err;
       }
});
/*


/* 
login user 
*/

server.register({
	register : require("./api/v1/auth/login")},{
     select : ['auth']
	}, (err) => {
      if(err){
          throw err;
       }
});

/* 
logout user
*/
server.register({
	register : require("./api/v1/auth/logout")},{
		select : ['auth']
	},(err) => {
		if(err){
			throw err;
		}
});


/* 
logout user
*/
server.register({
	register : require("./api/v1/posts/addPosts")},{
		select : ['auth']
	},(err) => {
		if(err){
			throw err;
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
const api = require("./api");
const Good = require("good");

module.exports = [
/* 
register the All Api 
*/
{
	register : api
},
{
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
}]
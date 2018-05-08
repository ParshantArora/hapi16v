const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Postdata = new Schema({
	 userId :  {type: String , required : true },
	 message : {type : String , default : '', required: true},
	 image: {type: String , default : ''},
	 likes: {type : String ,default : 0},
});

module.exports = mongoose.model('Posts',Postdata);